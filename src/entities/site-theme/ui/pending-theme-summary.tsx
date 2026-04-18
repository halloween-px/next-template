'use client';

import { resolveThemeLayers } from '@/kit/styles/registry';
import { Badge } from '@/kit/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ThemeConfig } from '@/types/site';

type Props = {
	theme: ThemeConfig;
	className?: string;
};

function SwatchCard({
	label,
	value,
	className,
}: {
	label: string;
	value: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'flex min-w-0 flex-1 flex-col gap-2 rounded-xl border border-border/70 bg-background/90 p-3 shadow-sm',
				className,
			)}>
			<span className='text-[10px] font-medium uppercase tracking-wide text-muted-foreground'>{label}</span>
			<div className='flex items-center gap-3'>
				<span
					className='size-12 shrink-0 rounded-lg border border-black/10 shadow-inner ring-1 ring-black/5 dark:ring-white/10'
					style={{ backgroundColor: value }}
					title={value}
				/>
				<span className='min-w-0 break-all font-mono text-[11px] leading-snug text-foreground tabular-nums'>
					{value}
				</span>
			</div>
		</div>
	);
}

/** Компактная карточка выбранной в лаборатории темы для модалки создания проекта. */
export function PendingThemeSummary({ theme, className }: Props) {
	const layers = resolveThemeLayers(theme);
	const schemeLabel = theme.colorScheme === 'dark' ? 'Тёмная тема' : 'Светлая тема';

	const chips: { label: string; value: string }[] = [
		{ label: 'Нейтраль', value: layers.base },
		{ label: 'Акцент', value: layers.accent },
		{ label: 'Графики', value: layers.chart },
		{ label: 'Стиль', value: layers.style ?? '—' },
	];

	return (
		<div className={cn('space-y-3', className)}>
			<div className='flex flex-wrap gap-2'>
				<Badge variant='secondary' className='font-normal'>
					{schemeLabel}
				</Badge>
			</div>

			<div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
				<SwatchCard label='Primary (слой акцента)' value={theme.primaryColor} />
				<SwatchCard label='Графики (chart‑1)' value={theme.accentColor} />
			</div>

			<div className='flex flex-wrap gap-1.5'>
				{chips.map((c) => (
					<Badge key={c.label} variant='outline' className='text-[11px] font-normal'>
						<span className='text-muted-foreground'>{c.label}:</span>
						<span className='ml-1 capitalize text-foreground'>{c.value}</span>
					</Badge>
				))}
			</div>
		</div>
	);
}
