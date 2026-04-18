'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Props = {
	/** Короткая метка над заголовком, напр. «Шаг 1». */
	kicker: string;
	icon: ReactNode;
	title: string;
	description?: string;
	/** `dashed` — опциональное действие без выбора (например, тема ещё не настроена). */
	variant?: 'default' | 'dashed';
	children: ReactNode;
	className?: string;
};

/**
 * Общая оболочка для блоков «действие пользователя» в модалке создания проекта
 * (название и тема визуально согласованы).
 */
export function CreateProjectActionCard({
	kicker,
	icon,
	title,
	description,
	variant = 'default',
	children,
	className,
}: Props) {
	return (
		<section
			className={cn(
				'overflow-hidden rounded-2xl border-2 bg-card shadow-sm',
				variant === 'dashed'
					? 'border-dashed border-primary/25 ring-0'
					: 'border-primary/25 ring-1 ring-primary/10',
				className,
			)}>
			<header className='border-b border-border/50 bg-muted/35 px-4 py-3.5 md:px-5'>
				<div className='flex items-start gap-3'>
					<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15'>
						{icon}
					</span>
					<div className='min-w-0 pt-0.5'>
						<p className='text-[11px] font-semibold uppercase tracking-wider text-primary'>{kicker}</p>
						<h3 className='mt-1 text-sm font-semibold tracking-tight text-foreground'>{title}</h3>
						{description ? (
							<p className='mt-1 text-xs leading-relaxed text-muted-foreground'>{description}</p>
						) : null}
					</div>
				</div>
			</header>
			<div className='px-4 py-4 md:px-5 md:py-5'>{children}</div>
		</section>
	);
}
