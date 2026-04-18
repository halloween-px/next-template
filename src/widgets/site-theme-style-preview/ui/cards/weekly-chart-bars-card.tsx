'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

const CHART_BAR_CLASS = [
	'bg-chart-1',
	'bg-chart-2',
	'bg-chart-3',
	'bg-chart-4',
	'bg-chart-5',
] as const;

/** Столбиковая «диаграмма» на токенах `--chart-*` */
export function WeeklyChartBarsCard() {
	const heights = [42, 68, 36, 82, 54, 71, 48, 91, 58, 76];
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<div className='flex items-center gap-2'>
					<BarChart3 className='size-4 text-muted-foreground' aria-hidden />
					<CardTitle className='text-base'>Активность по дням</CardTitle>
				</div>
				<CardDescription>Цвета из слоя Chart (`--chart-1` … `--chart-5`)</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex h-36 items-end justify-between gap-1.5 px-0.5'>
					{heights.map((pct, i) => (
						<div
							key={i}
							className={cn(
								'min-w-0 flex-1 rounded-t-sm transition-[height] duration-300',
								CHART_BAR_CLASS[i % CHART_BAR_CLASS.length]
							)}
							style={{ height: `${pct}%` }}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
