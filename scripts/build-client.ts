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

// Дополнительно добавляем header / footer (не в sections, но их тоже нужно скопировать)
const HEADER_BLOCK_TYPE = ORDER_CONFIG.header?.type;
const FOOTER_BLOCK_TYPE = ORDER_CONFIG.footer?.type;

// Вычисляем список уникальных блоков для копирования файлов
// Set уберет дубликаты, если у нас 2 одинаковых блока
const USED_BLOCKS = [
	...new Set([
		...SECTIONS.map((s) => s.type),
		...(HEADER_BLOCK_TYPE ? [HEADER_BLOCK_TYPE] : []),
		...(FOOTER_BLOCK_TYPE ? [FOOTER_BLOCK_TYPE] : []),
	]),
];

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
			path.join(SOURCE_DIR, 'kit/components/ui'),
			path.join(OUTPUT_DIR, 'src/components/ui'),
			{
				filter: (src: any) => !src.includes('link.tsx'),
			}
		);
		const sharedDir = path.join(SOURCE_DIR, 'kit/components/shared');
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
			const srcBlockDir = path.join(SOURCE_DIR, 'kit/components/blocks', category);
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

		// Данные компании — один файл в скачанном проекте (рядом с тем же путём, что в конструкторе)
		console.log(chalk.yellow('📋 Копируем src/templates/company.ts...'));
		await fs.ensureDir(path.join(OUTPUT_DIR, 'src/templates'));
		await fs.copy(
			path.join(SOURCE_DIR, 'templates/company.ts'),
			path.join(OUTPUT_DIR, 'src/templates/company.ts'),
		);

		// 4.1 REWRITE IMPORTS (kit -> components)
		console.log(chalk.yellow('🧩 Переписываем импорты (@/kit -> @/components)...'));
		await rewriteImportsInOutput();

		// 5. ГЕНЕРАЦИЯ CONTENT.JSON
		console.log(chalk.yellow('💾 Сохраняем контент...'));
		await fs.ensureDir(path.join(OUTPUT_DIR, 'src/data'));

		// Сохраняем полную структуру страницы + глобальные данные сайта
		const contentData = {
			site: {
				id: ORDER_CONFIG.id,
				siteName: ORDER_CONFIG.siteName,
				theme: ORDER_CONFIG.theme,
				companyInfo: ORDER_CONFIG.companyInfo,
				navigation: ORDER_CONFIG.navigation,
			},
			header: ORDER_CONFIG.header,
			footer: ORDER_CONFIG.footer,
			page: {
				meta: PAGE.meta,
				sections: SECTIONS,
			},
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
		return `import ${compName} from '@/components/blocks/${cat}/${compName}';`;
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
import content from '@/data/content.json';
${imports}

// Карта компонентов (Сгенерирована автоматически)
const BLOCKS_MAP: Record<string, ComponentType<any>> = {
  ${mapEntries}
};

export const SectionRenderer = ({ section }: { section: any }) => {
  const Component = BLOCKS_MAP[section.type];

  if (!Component) {
    console.warn(\`Block type "\${section.type}" not found in renderer.\`);
    return null;
  }

  const siteNav = content.site?.navigation as { links?: unknown } | undefined;
  const props =
    typeof section.type === 'string' &&
    section.type.startsWith('header-') &&
    siteNav?.links
      ? { ...section.content, navigationData: siteNav.links }
      : section.content;

  return <Component {...props} />;
};
`;

	await fs.writeFile(path.join(OUTPUT_DIR, 'src/components/SectionRenderer.tsx'), content);
}

async function generatePage() {
	// Страница теперь супер-простая, она просто читает JSON
	const content = `
import content from '@/data/content.json';
import { SectionRenderer } from '@/components/SectionRenderer';

export const metadata = {
  title: content.page.meta.title,
  description: content.page.meta.description,
};

export default function Home() {
  return (
    <main>
      {/* Header (не в sections) */}
      {content.header ? <SectionRenderer section={content.header} /> : null}

      {/* Sections */}
      {content.page.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} />
      ))}

      {content.footer ? <SectionRenderer section={content.footer} /> : null}
    </main>
  );
}
`;
	await fs.writeFile(path.join(OUTPUT_DIR, 'src/app/page.tsx'), content);
}

async function rewriteImportsInOutput() {
	const srcRoot = path.join(OUTPUT_DIR, 'src');
	if (!(await fs.pathExists(srcRoot))) return;

	const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

	const walk = async (dir: string) => {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				await walk(fullPath);
				continue;
			}

			const ext = path.extname(entry.name);
			if (!exts.has(ext)) continue;

			let code = await fs.readFile(fullPath, 'utf8');
			const original = code;

			// UI
			code = code.replaceAll('@/kit/components/ui/', '@/components/ui/');
			// Shared
			code = code.replaceAll('@/kit/components/shared/', '@/components/shared/');
			// Blocks (sometimes blocks import other blocks)
			code = code.replaceAll('@/kit/components/blocks/', '@/components/blocks/');

			// Fallback: any remaining `@/kit/components/...` to `@/components/...`
			code = code.replaceAll('@/kit/components/', '@/components/');

			if (code !== original) {
				await fs.writeFile(fullPath, code, 'utf8');
			}
		}
	};

	await walk(srcRoot);
}

build();
