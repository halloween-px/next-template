'use client';

import { Badge } from '@/kit/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

/** Три метрики в ряд */
export function KpiTrendSummaryCard() {
	const items = [
		{ label: 'Выручка', value: '24.3k', delta: '+12.4%', up: true },
		{ label: 'Сессии', value: '1.02k', delta: '+3.1%', up: true },
		{ label: 'Отказ', value: '32%', delta: '−4%', up: false },
	] as const;
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<div className='flex items-center justify-between gap-2'>
					<CardTitle className='text-base'>Сводка</CardTitle>
					<Badge variant='secondary' className='font-normal'>
						квартал
					</Badge>
				</div>
				<CardDescription>Карточка KPI + тренд</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-3 gap-3'>
					{items.map((it) => (
						<div
							key={it.label}
							className='rounded-xl border border-border/60 bg-background/50 p-3 shadow-xs'>
							<p className='text-[11px] font-medium text-muted-foreground'>{it.label}</p>
							<p className='mt-1 text-lg font-semibold tabular-nums tracking-tight'>{it.value}</p>
							<p
								className={cn(
									'mt-1 flex items-center gap-0.5 text-[11px] font-medium',
									it.up
										? 'text-emerald-600 dark:text-emerald-400'
										: 'text-rose-600 dark:text-rose-400'
								)}>
								{it.up ? (
									<TrendingUp className='size-3' aria-hidden />
								) : (
									<TrendingUp className='size-3 rotate-180' aria-hidden />
								)}
								{it.delta}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
