import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { siteConfig } from '@/templates/site-template';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// 1. ДАННЫЕ (Имитация того, что пришло с фронта)
// ==========================================
// Представь, что это твой siteConfig, который ты передал в скрипт
const ORDER_CONFIG = siteConfig;
const PAGE = ORDER_CONFIG.pages[0];
const SECTIONS = PAGE.sections;
// Вычисляем список уникальных блоков для копирования файлов
// Set уберет дубликаты, если у нас 2 одинаковых блока
const USED_BLOCKS = [...new Set(SECTIONS.map((s) => s.type))];

// ПУТИ
const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, 'src');
const SKELETON_DIR = path.join(ROOT_DIR, 'skeleton');
const OUTPUT_DIR = path.join(ROOT_DIR, 'output', ORDER_CONFIG.siteName);

async function build() {
	console.log(chalk.blue(`🚀 Сборка проекта: ${ORDER_CONFIG.siteName}`));

	try {
		// 1. ОЧИСТКА И СКЕЛЕТ
		await fs.remove(OUTPUT_DIR);
		await fs.ensureDir(OUTPUT_DIR);
		console.log(chalk.yellow('📦 Копируем скелет...'));
		await fs.copy(SKELETON_DIR, OUTPUT_DIR);

		// C. СИНХРОНИЗАЦИЯ package.json
		console.log(chalk.yellow('⚙️  Синхронизируем зависимости...'));
		await mergePackageJson();

		// 3. UI & SHARED (Копируем как раньше)
		console.log(chalk.yellow('🎨 Копируем UI и Shared...'));
		await fs.copy(
			path.join(SOURCE_DIR, 'components/ui'),
			path.join(OUTPUT_DIR, 'src/components/ui'),
			{
				filter: (src: any) => !src.includes('link.tsx'),
			}
		);
		const sharedDir = path.join(SOURCE_DIR, 'components/shared');
		if (await fs.pathExists(sharedDir)) {
			await fs.copy(sharedDir, path.join(OUTPUT_DIR, 'src/components/shared'));
		}

		console.log(chalk.yellow('🏗️  Копируем Lib папку...'));
		const libDir = path.join(SOURCE_DIR, 'lib');
		if (await fs.pathExists(libDir)) {
			await fs.copy(libDir, path.join(OUTPUT_DIR, 'src/lib'));
		}

		console.log(chalk.yellow('🏗️  Копируем Стили...'));
		const styleDir = path.join(SOURCE_DIR, 'styles');
		if (await fs.pathExists(styleDir)) {
			await fs.copy(styleDir, path.join(OUTPUT_DIR, 'src/styles'));
		}

		console.log(chalk.yellow('🏗️  Копируем фотки...'));
		const publicDir = path.join(ROOT_DIR, 'public');
		if (await fs.pathExists(publicDir)) {
			await fs.copy(publicDir, path.join(OUTPUT_DIR, 'public'));
		}

		// 4. КОПИРОВАНИЕ БЛОКОВ
		console.log(chalk.yellow('🧱 Копируем блоки...'));
		for (const blockType of USED_BLOCKS) {
			const [category, variant] = blockType.split('-'); // 'about', 'v1'
			const srcBlockDir = path.join(SOURCE_DIR, 'components/blocks', category);
			const destBlockDir = path.join(OUTPUT_DIR, 'src/components/blocks', category);

			if (!(await fs.pathExists(srcBlockDir))) continue;

			// Копируем с фильтрацией и переименованием (v1.tsx -> AboutV1.tsx)
			await fs.copy(srcBlockDir, destBlockDir, {
				filter: (src: any, dest: any) => {
					const basename = path.basename(src);
					if (fs.lstatSync(src).isDirectory()) return true;
					if (['registry.ts', 'config.ts'].includes(basename)) return false;
					if (/^v\d+\.tsx$/.test(basename)) return basename === `${variant}.tsx`;
					return true;
				},
			});

			// Ренейминг
			const oldFile = path.join(destBlockDir, `${variant}.tsx`);
			const niceName = category.charAt(0).toUpperCase() + category.slice(1) + variant.toUpperCase();
			const newFile = path.join(destBlockDir, `${niceName}.tsx`);
			if (await fs.pathExists(oldFile)) await fs.move(oldFile, newFile);
		}

		// 5. ГЕНЕРАЦИЯ CONTENT.JSON
		console.log(chalk.yellow('💾 Сохраняем контент...'));
		await fs.ensureDir(path.join(OUTPUT_DIR, 'src/data'));

		// Сохраняем полную структуру страницы
		const contentData = {
			meta: PAGE.meta,
			sections: SECTIONS,
		};

		await fs.writeJson(path.join(OUTPUT_DIR, 'src/data/content.json'), contentData, { spaces: 2 });

		// 6. ГЕНЕРАЦИЯ SECTION RENDERER
		console.log(chalk.yellow('🎬 Генерируем SectionRenderer...'));
		await generateRenderer();

		console.log(chalk.yellow('🎬 Генерируем Стили...'));

		// 7. ГЕНЕРАЦИЯ PAGE.TSX
		console.log(chalk.yellow('📄 Генерируем page.tsx...'));
		await generatePage();

		console.log(chalk.green(`\n✅ Готово! cd output/${ORDER_CONFIG.siteName}`));
	} catch (err) {
		console.error(chalk.red('❌ Ошибка:'), err);
	}
}

// === НОВЫЕ ФУНКЦИИ ГЕНЕРАЦИИ ===

async function mergePackageJson() {
	const skeletonPkg = await fs.readJson(path.join(SKELETON_DIR, 'package.json'));
	const donorPkg = await fs.readJson(path.join(ROOT_DIR, 'package.json'));

	// Список пакетов, которые НЕ нужны клиенту (инструменты разработки конструктора)
	const IGNORE_DEPS = [
		'husky',
		'lint-staged',
		'fs-extra',
		'chalk',
		'ts-node',
		'tsconfig-paths',
		'@types/fs-extra',
		'@types/node',
	];

	// Функция слияния
	const mergeDeps = (target: any, source: any) => {
		for (const [key, val] of Object.entries(source || {})) {
			if (!IGNORE_DEPS.includes(key)) {
				target[key] = val;
			}
		}
		return target;
	};

	skeletonPkg.dependencies = mergeDeps(skeletonPkg.dependencies || {}, donorPkg.dependencies);
	skeletonPkg.devDependencies = mergeDeps(
		skeletonPkg.devDependencies || {},
		donorPkg.devDependencies
	);

	skeletonPkg.name = ORDER_CONFIG.siteName;

	await fs.writeJson(path.join(OUTPUT_DIR, 'package.json'), skeletonPkg, { spaces: 2 });
}

async function generateRenderer() {
	// 1. Создаем импорты только для используемых блоков
	const imports = USED_BLOCKS.map((b) => {
		const [cat, v] = b.split('-');
		const compName = `${cat.charAt(0).toUpperCase() + cat.slice(1)}${v.toUpperCase()}`;
		return `import ${compName} from '@/kit/components/blocks/${cat}/${compName}';`;
	}).join('\n');

	// 2. Создаем карту компонентов (упрощенную, без dynamic)
	// Ключи должны совпадать с тем, что написано в content.json (type)
	const mapEntries = USED_BLOCKS.map((b) => {
		const [cat, v] = b.split('-');
		const compName = `${cat.charAt(0).toUpperCase() + cat.slice(1)}${v.toUpperCase()}`;
		// 'about/v1': AboutV1
		return `'${b}': ${compName},`;
	}).join('\n  ');

	const content = `
'use client';

import { ComponentType } from 'react';
${imports}

// Карта компонентов (Сгенерирована автоматически)
const BLOCKS_MAP: Record<string, ComponentType<any>> = {
  ${mapEntries}
};

export const SectionRenderer = ({ section }: { section: any }) => {
  // section.type это 'about/v1'
  const Component = BLOCKS_MAP[section.type];

  if (!Component) {
    console.warn(\`Block type "\${section.type}" not found in renderer.\`);
    return null;
  }

  // Передаем контент как пропсы
  return <Component {...section.content} />;
};
`;

	await fs.writeFile(path.join(OUTPUT_DIR, 'src/components/SectionRenderer.tsx'), content);
}

async function generatePage() {
	// Страница теперь супер-простая, она просто читает JSON
	const content = `
import content from '@/data/content.json';
import { SectionRenderer } from '@/kit/components/SectionRenderer';

export const metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function Home() {
  return (
    <main>
      {content.sections.map((section, index) => (
        // Используем index как ключ, или добавь id в json
        <SectionRenderer key={index} section={section} />
      ))}
    </main>
  );
}
`;
	await fs.writeFile(path.join(OUTPUT_DIR, 'src/app/page.tsx'), content);
}

build();
