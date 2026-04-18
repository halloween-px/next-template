'use client';

import { cn } from '@/lib/utils';
import { setActiveBlockId, useBuilderStore } from '@/stores/slices/site-store';
import type { Block } from '@/types/site';
import type { ReactNode } from 'react';

type ShowActiveBlockProps = {
	sectionId: Block['id'];
	children: ReactNode;
};

type ShowActiveBlockPropsExt = ShowActiveBlockProps & {
	/** Для хедера — мягче кольцо и без сдвига вёрстки (`border` давал «дёрганье»). */
	variant?: 'default' | 'header';
};

/**
 * Внешнее выделение без «сырых» hsl(var(--primary)): в теме `--primary` в формате oklch,
 * произвольные shadow с hsl() давали невалидный цвет и обводка пропадала целиком.
 */
const activeOutline = (header: boolean) =>
	cn(
		header ? 'z-50' : 'z-[8]',
		'ring-[3px] ring-primary ring-offset-[4px] ring-offset-background',
		/* Свечение только через утилиты Tailwind — корректная работа с oklch */
		'shadow-xl shadow-primary/35',
		header && 'shadow-lg shadow-primary/25',
	);

/** Обводка и выбор активного блока в превью билдера (не часть kit). */
export const ShowActiveBlock = ({
	sectionId,
	children,
	variant = 'default',
}: ShowActiveBlockPropsExt) => {
	const activeSectionId = useBuilderStore((s) => s.activeSection);
	const isActive = sectionId === activeSectionId;
	const isHeader = variant === 'header';

	return (
		<div
			data-builder-section={sectionId}
			data-builder-active={isActive ? 'true' : undefined}
			className={cn(
				'relative isolate cursor-pointer overflow-visible rounded-md transition-[box-shadow,ring] duration-200 ease-out',
				/**
				 * Шапка должна быть выше секций страницы в стеке: при выбранном hero обёртка секции
				 * получает z-[8], и без базового z-index шапки выпадающее меню оказывается под hero.
				 */
				isHeader && 'z-50',
				!isActive &&
					'hover:ring-2 hover:ring-primary/45 hover:ring-offset-2 hover:ring-offset-background hover:shadow-md hover:shadow-primary/15',
				isActive && activeOutline(isHeader),
			)}
			onClick={(e) => {
				e.stopPropagation();
				setActiveBlockId(sectionId);
			}}>
			<div className='relative z-0'>{children}</div>

			{isActive ? (
				<>
					{/* Поверх контента секции: видно даже на hero/медиа; клики проходят к блоку */}
					<span
						aria-hidden
						className='pointer-events-none absolute inset-2 z-100 rounded-lg ring-2 ring-inset ring-primary/80'
					/>
					<span
						className={cn(
							'pointer-events-none absolute z-110 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide',
							'bg-primary text-primary-foreground shadow-md ring-2 ring-background',
							isHeader ? 'left-2 top-2' : 'left-3 top-3',
						)}>
						Выбрано
					</span>
				</>
			) : null}
		</div>
	);
};
