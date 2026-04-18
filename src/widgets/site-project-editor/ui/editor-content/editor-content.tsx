'use client';

import { ABOUT_ID } from '@/kit/components/blocks/about/config/_about';
import { SECTION_HEADER_ID } from '@/kit/components/blocks/header/config/_header';
import { HERO_ID } from '@/kit/components/blocks/hero/config/_hero';
import { PORTFOLIOS_ID } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { CONTACTS_ID } from '@/kit/components/blocks/contacts/config/_contacts';
import { REVIEWS_ID } from '@/kit/components/blocks/reviews/config/_reviews';
import { TEAMS_ID } from '@/kit/components/blocks/teams/config/_team';
import { INFOBLOCKS_ID } from '@/kit/components/blocks/infoblocks/config/_infoblocks';
import { SERVICES_ID } from '@/kit/components/blocks/services/config/_services';
import { STATS_ID } from '@/kit/components/blocks/stats/config/_stats';
import { scrollToBuilderSection } from '@/features/site-project-preview/scroll-to-builder-section';
import { useBuilderStore } from '@/stores/slices/site-store';
import {
	aboutConfigs,
	heroConfigs,
	portfolioConfigs,
	reviewsConfigs,
	contactsConfigs,
	servicesConfigs,
	teamConfigs,
} from '@/templates/registry';
import type { BaseBlockType, BlockContentByType } from '@/types/site';
import { cn } from '@/lib/utils';
import { Check, LayoutTemplate } from 'lucide-react';
import type { ReactNode } from 'react';

import { SectionLayoutControls } from '../section-layout-controls';

const ABOUT_EDITOR_SECTION_IDS = new Set<string>([ABOUT_ID, STATS_ID, INFOBLOCKS_ID]);

type SectionMeta = {
	title: string;
	hint: string;
};

function metaForActiveSection(activeSection: string): SectionMeta | null {
	if (activeSection === HERO_ID) {
		return { title: 'Первый экран', hint: 'Пресеты героя — заголовок, медиа и призыв к действию' };
	}
	if (activeSection === SERVICES_ID) {
		return { title: 'Услуги', hint: 'Варианты сетки и карточек услуг' };
	}
	if (ABOUT_EDITOR_SECTION_IDS.has(activeSection)) {
		return {
			title: 'О компании',
			hint: 'Варианты секции, статистики и инфоблоков в одном пресете',
		};
	}
	if (activeSection === SECTION_HEADER_ID) {
		return {
			title: 'Шапка сайта',
			hint: 'Настройки шапки задаются в общем конфиге проекта.',
		};
	}
	if (activeSection === PORTFOLIOS_ID) {
		return {
			title: 'Портфолио',
			hint: 'Три варианта сетки и карточек — от классики до градиентных панелей.',
		};
	}
	if (activeSection === TEAMS_ID) {
		return {
			title: 'Команда',
			hint: 'Три варианта: витринные карточки, журнальные ряды или компактная сетка с аватарами.',
		};
	}
	if (activeSection === REVIEWS_ID) {
		return {
			title: 'Отзывы',
			hint: 'Три варианта: карусель карточек, сетка с цитатами или полосы с чередованием слева/справа.',
		};
	}
	if (activeSection === CONTACTS_ID) {
		return {
			title: 'Контакты',
			hint: 'Три варианта: классическая сетка, колонка реквизитов + форма или узкий блок с чипами.',
		};
	}
	return null;
}

function variantVersionNumber(type: string): number {
	const m = type.match(/-v(\d+)$/i);
	return m ? parseInt(m[1], 10) : 0;
}

function sortVariantEntries<B extends BaseBlockType>(
	entries: [string, { type: string; content: BlockContentByType[B] }][]
): [string, { type: string; content: BlockContentByType[B] }][] {
	return [...entries].sort(
		([, a], [, b]) => variantVersionNumber(a.type) - variantVersionNumber(b.type)
	);
}

/** Переключение пресета блока (тип + контент из реестра) в превью билдера */
function BlockVariantPicker<B extends BaseBlockType>({
	sectionId,
	variants,
	meta,
}: {
	sectionId: string;
	variants: Record<string, { type: string; content: BlockContentByType[B] }>;
	meta: SectionMeta;
}) {
	const changeBlockType = useBuilderStore((s) => s.changeBlockType);
	const sections = useBuilderStore((s) => s.sections);
	const currentType = sections?.find((sec) => sec.id === sectionId)?.type ?? null;

	const entries = sortVariantEntries(Object.entries(variants));

	return (
		<div className='rounded-xl border border-white/12 bg-white/4 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'>
			<div className='mb-4 flex gap-3'>
				<div
					className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/25'
					aria-hidden>
					<LayoutTemplate className='size-5 opacity-90' />
				</div>
				<div className='min-w-0 flex-1'>
					<p className='text-[11px] font-medium uppercase tracking-wide text-white/45'>Выбранный блок</p>
					<p className='truncate text-sm font-semibold text-white'>{meta.title}</p>
					<p className='mt-1 text-xs leading-relaxed text-white/55'>{meta.hint}</p>
				</div>
			</div>

			<p className='mb-3 text-[11px] font-medium uppercase tracking-wide text-white/40'>Вариант оформления</p>
			<div className='-mx-1 flex gap-3 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-0.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent'>
				{entries.map(([, value], index) => {
					const selected = currentType === value.type;
					const ver = variantVersionNumber(value.type) || index + 1;

					return (
						<button
							key={value.type}
							type='button'
							onClick={() => {
								changeBlockType<B>({
									sectionId,
									newType: value.type as `${B}-${string}`,
									newContent: value.content,
								});
								requestAnimationFrame(() => {
									requestAnimationFrame(() => scrollToBuilderSection(sectionId));
								});
							}}
							className={cn(
								'group relative flex w-[158px] shrink-0 flex-col gap-3 rounded-xl border p-3.5 text-left transition-all duration-200',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
								selected
									? 'border-violet-400/50 bg-linear-to-b from-violet-500/20 to-violet-500/5 shadow-[0_0_0_1px_rgba(167,139,250,0.25)]'
									: 'border-white/10 bg-white/3 hover:border-white/18 hover:bg-white/6'
							)}>
							{selected ? (
								<span
									className='absolute right-2.5 top-2.5 flex size-6 items-center justify-center rounded-full bg-violet-500/90 text-white shadow-sm'
									aria-hidden>
									<Check className='size-3.5' strokeWidth={2.5} />
								</span>
							) : null}

							<div
								className={cn(
									'flex size-9 items-center justify-center rounded-lg transition-colors',
									selected
										? 'bg-white/15 text-white'
										: 'bg-white/8 text-white/70 group-hover:bg-white/12 group-hover:text-white'
								)}
								aria-hidden>
								<LayoutTemplate className='size-4' />
							</div>

							<div className='min-w-0 pr-6'>
								<p className='text-sm font-semibold leading-snug text-white'>Вариант {ver}</p>
								<p className='mt-2 truncate font-mono text-[10px] text-white/30' title={value.type}>
									{value.type}
								</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}

function NoVariantsForBlock() {
	return (
		<div className='rounded-xl border border-dashed border-white/15 bg-white/2 px-4 py-6 text-center'>
			<p className='text-sm font-medium text-white/85'>Этот блок</p>
			<p className='mt-2 text-xs leading-relaxed text-white/45'>
				Переключаемые варианты для него пока не подключены — скоро добавим.
			</p>
		</div>
	);
}

export const EditorContent = () => {
	const activeSection = useBuilderStore((s) => s.activeSection);

	if (!activeSection) return null;

	const meta = metaForActiveSection(activeSection);
	const showSectionAlignControls = activeSection !== SECTION_HEADER_ID;

	let main: ReactNode;

	if (ABOUT_EDITOR_SECTION_IDS.has(activeSection)) {
		main = (
			<BlockVariantPicker<'about'>
				sectionId={ABOUT_ID}
				variants={aboutConfigs}
				meta={meta ?? { title: 'О компании', hint: '' }}
			/>
		);
	} else if (activeSection === HERO_ID) {
		main = (
			<BlockVariantPicker<'hero'>
				sectionId={HERO_ID}
				variants={heroConfigs}
				meta={meta ?? { title: 'Первый экран', hint: '' }}
			/>
		);
	} else if (activeSection === SERVICES_ID) {
		main = (
			<BlockVariantPicker<'services'>
				sectionId={SERVICES_ID}
				variants={servicesConfigs}
				meta={meta ?? { title: 'Услуги', hint: '' }}
			/>
		);
	} else if (activeSection === PORTFOLIOS_ID) {
		main = (
			<BlockVariantPicker<'portfolios'>
				sectionId={PORTFOLIOS_ID}
				variants={portfolioConfigs}
				meta={meta ?? { title: 'Портфолио', hint: '' }}
			/>
		);
	} else if (activeSection === TEAMS_ID) {
		main = (
			<BlockVariantPicker<'teams'>
				sectionId={TEAMS_ID}
				variants={teamConfigs}
				meta={meta ?? { title: 'Команда', hint: '' }}
			/>
		);
	} else if (activeSection === REVIEWS_ID) {
		main = (
			<BlockVariantPicker<'reviews'>
				sectionId={REVIEWS_ID}
				variants={reviewsConfigs}
				meta={meta ?? { title: 'Отзывы', hint: '' }}
			/>
		);
	} else if (activeSection === CONTACTS_ID) {
		main = (
			<BlockVariantPicker<'contacts'>
				sectionId={CONTACTS_ID}
				variants={contactsConfigs}
				meta={meta ?? { title: 'Контакты', hint: '' }}
			/>
		);
	} else {
		main = <NoVariantsForBlock />;
	}

	return (
		<>
			{main}
			{showSectionAlignControls ? <SectionLayoutControls /> : null}
		</>
	);
};
