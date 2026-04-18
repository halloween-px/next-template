'use client';

import {
	SectionTitle,
	type SectionTitleVariant,
} from '@/kit/components/shared/sections/section-title';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';

const SECTION_TITLE_DEMO = {
	title: 'Раздел',
	subtitle: 'Заголовок секции',
	description: 'Один и тот же текст — разные пресеты SectionTitle.',
};

const SECTION_TITLE_VARIANT_LAB_META: Record<SectionTitleVariant, { code: string; hint: string }> =
	{
		default: { code: 'default', hint: 'Бейдж и иконка' },
		minimal: { code: 'minimal', hint: 'Текстовый eyebrow' },
		rail: { code: 'rail', hint: 'Акцентная полоса слева' },
		underline: { code: 'underline', hint: 'Линия под eyebrow' },
		pill: { code: 'pill', hint: 'Капсула с фоном и рамкой' },
		dot: { code: 'dot', hint: 'Точка рядом с eyebrow' },
	};

export type SectionTitleUiKitPresetsProps = {
	selected: SectionTitleVariant;
	busy?: boolean;
	onSelect: (variant: SectionTitleVariant) => void;
};

export function SectionTitleUiKitPresets({
	selected,
	busy,
	onSelect,
}: SectionTitleUiKitPresetsProps) {
	return (
		<>
			<Typography.Title level={4} as='h2' className='tracking-tight'>
				Заголовки секций
			</Typography.Title>
			<Typography.Text size='sm' color='muted' className='mt-2'>
				Выбор сохраняется в конфиг проекта в поле uiKit.sectionTitle и подставляется во все блоки с
				SectionTitle в превью.
			</Typography.Text>

			<div className='mt-10'>
				<Typography.Text size='xs' color='muted' className='mb-4 block uppercase tracking-wide'>
					Серая полоска сверху карточки — подпись лаборатории. Клик выбирает пресет и сохраняет в
					проект.
				</Typography.Text>
				<div className='grid gap-6 md:grid-cols-2'>
					{(
						[
							'default',
							'minimal',
							'rail',
							'underline',
							'pill',
							'dot',
						] satisfies SectionTitleVariant[]
					).map(
						(variant) => {
							const meta = SECTION_TITLE_VARIANT_LAB_META[variant];
							const isSelected = selected === variant;
							return (
								<div
									key={variant}
									role='button'
									tabIndex={0}
									aria-pressed={isSelected}
									aria-label={`Выбрать пресет заголовка ${meta.code}`}
									onClick={() => onSelect(variant)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											onSelect(variant);
										}
									}}
									className={cn(
										'flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-muted/10 text-left outline-none transition-[box-shadow,border-color,ring] focus-visible:ring-2 focus-visible:ring-ring',
										isSelected
											? 'border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
											: 'border-border/60 hover:border-muted-foreground/30',
										busy && 'pointer-events-none opacity-60'
									)}>
									<div className='border-b border-border/60 bg-muted/45 px-3 py-2.5'>
										<p className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>
											Пресет лаборатории (не контент блока)
										</p>
										<p className='mt-1 font-mono text-sm text-foreground/90'>{meta.code}</p>
										<p className='mt-0.5 text-xs leading-snug text-muted-foreground'>{meta.hint}</p>
										{isSelected ? (
											<p className='mt-2 text-[11px] font-medium text-primary'>
												Активно на сайте
											</p>
										) : null}
									</div>
									<div className='bg-background/60 p-5'>
										<SectionTitle
											variant={variant}
											align='left'
											className='mb-0 max-w-none'
											{...SECTION_TITLE_DEMO}
										/>
									</div>
								</div>
							);
						}
					)}
				</div>
			</div>
		</>
	);
}
