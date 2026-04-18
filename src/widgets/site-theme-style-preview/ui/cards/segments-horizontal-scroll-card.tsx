'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

/** Внутри карточки — горизонтальный скролл мини-плиток */
export function SegmentsHorizontalScrollCard() {
	const tiles = [
		{ t: 'Alpha', v: '12%', c: 'bg-chart-1' },
		{ t: 'Beta', v: '28%', c: 'bg-chart-2' },
		{ t: 'Gamma', v: '9%', c: 'bg-chart-3' },
		{ t: 'Delta', v: '41%', c: 'bg-chart-4' },
		{ t: 'Epsilon', v: '19%', c: 'bg-chart-5' },
		{ t: 'Zeta', v: '33%', c: 'bg-primary' },
	] as const;
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Сегменты</CardTitle>
				<CardDescription>Прокрутка по X внутри области</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='-mx-1 flex gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 pb-1 pt-0.5 [scrollbar-gutter:stable]'>
					{tiles.map((x) => (
						<div
							key={x.t}
							className='w-36 shrink-0 rounded-xl border border-border/60 bg-card/80 p-3 shadow-xs'>
							<div className={cn('mb-2 h-1.5 w-full rounded-full', x.c)} />
							<p className='text-xs font-medium text-muted-foreground'>{x.t}</p>
							<p className='text-lg font-semibold tabular-nums'>{x.v}</p>
							<div className='mt-2 flex items-center gap-1 text-[11px] text-muted-foreground'>
								<Star className='size-3 fill-primary/30 text-primary' aria-hidden />
								рейтинг
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
