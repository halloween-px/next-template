'use client';

import { Button } from '@/kit/components/ui/button';
import { cn } from '@/lib/utils';
import { useBuilderStore } from '@/stores/slices/site-store';
import type { SectionTextAlign } from '@/types/section-layout';
import { ArrowLeftRight } from 'lucide-react';

const ALIGN_OPTIONS: { value: SectionTextAlign; label: string }[] = [
	{ value: 'left', label: 'Слева' },
	{ value: 'center', label: 'Центр' },
	{ value: 'right', label: 'Справа' },
];

const EDITOR_DEFAULT_ALIGN: SectionTextAlign = 'center';

/** Как в `resolveSectionAlignFromContent` до сохранения в конфиг */
function effectiveTitleAlign(content: Record<string, unknown>): SectionTextAlign {
	const v = content.sectionTitleAlign as SectionTextAlign | undefined;
	return v ?? EDITOR_DEFAULT_ALIGN;
}

function effectiveBodyAlign(content: Record<string, unknown>): SectionTextAlign {
	const ba = content.sectionBodyAlign as SectionTextAlign | undefined;
	const ta = effectiveTitleAlign(content);
	return ba ?? ta;
}

export function SectionLayoutControls() {
	const activeSection = useBuilderStore((s) => s.activeSection);
	const sections = useBuilderStore((s) => s.sections);
	const patchSectionContent = useBuilderStore((s) => s.patchSectionContent);

	const section = sections?.find((x) => x.id === activeSection);
	if (!section || !activeSection) return null;

	const type = String(section.type);
	const base = type.split('-')[0];
	const content = section.content as Record<string, unknown>;

	const layoutReverse = Boolean(content.layoutReverse);

	const titleEffective = effectiveTitleAlign(content);
	const bodyEffective = effectiveBodyAlign(content);

	const showReverse = base === 'about' || type.startsWith('services-v2');

	const patch = (next: Record<string, unknown>) => patchSectionContent(activeSection, next);

	return (
		<div className='mt-6 rounded-xl border border-white/12 bg-white/4 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'>
			<p className='mb-3 text-[11px] font-medium uppercase tracking-wide text-white/40'>
				Выравнивание блока
			</p>

			<div className='space-y-4'>
				<div>
					<p className='mb-2 text-xs text-white/55'>Заголовок секции</p>
					<div className='flex flex-wrap gap-1.5'>
						{ALIGN_OPTIONS.map((opt) => {
							const selected = titleEffective === opt.value;
							return (
								<Button
									key={opt.value}
									type='button'
									variant='secondary'
									size='sm'
									className={cn(
										'min-w-[4.5rem] flex-1 border border-white/10 bg-white/10 text-xs text-white hover:bg-white/14 sm:flex-none',
										selected && 'border-violet-400/45 bg-violet-500/20 ring-1 ring-violet-400/30',
									)}
									aria-pressed={selected}
									onClick={() => patch({ sectionTitleAlign: opt.value })}>
									{opt.label}
								</Button>
							);
						})}
					</div>
				</div>

				<div>
					<p className='mb-2 text-xs text-white/55'>Текст и контент ниже заголовка</p>
					<div className='flex flex-wrap gap-1.5'>
						{ALIGN_OPTIONS.map((opt) => {
							const selected = bodyEffective === opt.value;
							return (
								<Button
									key={`body-${opt.value}`}
									type='button'
									variant='secondary'
									size='sm'
									className={cn(
										'min-w-[4.5rem] flex-1 border border-white/10 bg-white/10 text-xs text-white hover:bg-white/14 sm:flex-none',
										selected && 'border-violet-400/45 bg-violet-500/20 ring-1 ring-violet-400/30',
									)}
									aria-pressed={selected}
									onClick={() => patch({ sectionBodyAlign: opt.value })}>
									{opt.label}
								</Button>
							);
						})}
					</div>
				</div>

				{showReverse ? (
					<div className='border-t border-white/10 pt-4'>
						<Button
							type='button'
							variant='secondary'
							size='sm'
							className={cn(
								'w-full gap-2 border border-white/10 bg-white/10 text-white hover:bg-white/14',
								layoutReverse && 'border-emerald-400/35 bg-emerald-500/15',
							)}
							aria-pressed={layoutReverse}
							onClick={() => patch({ layoutReverse: !layoutReverse })}>
							<ArrowLeftRight className='size-4 opacity-90' aria-hidden />
							{layoutReverse ? 'Колонки: обычный порядок' : 'Поменять колонки местами'}
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
}
