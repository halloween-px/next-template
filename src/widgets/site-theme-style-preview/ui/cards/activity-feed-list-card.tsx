'use client';

import { Badge } from '@/kit/components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { type LucideIcon, CheckCircle2, Clock, Sparkles } from 'lucide-react';

/** Лента событий в одной карточке */
export function ActivityFeedListCard() {
	const items: {
		icon: LucideIcon;
		title: string;
		meta: string;
		badge: string;
		badgeVariant: 'default' | 'secondary' | 'outline';
	}[] = [
		{
			icon: CheckCircle2,
			title: 'Релиз v2.4 опубликован',
			meta: 'Production · 12 мин назад',
			badge: 'Успех',
			badgeVariant: 'default',
		},
		{
			icon: Clock,
			title: 'Синхронизация данных',
			meta: 'Запланировано на 18:00',
			badge: 'Ожидание',
			badgeVariant: 'outline',
		},
		{
			icon: Sparkles,
			title: 'Генерация превью завершена',
			meta: '12 миниатюр обработано',
			badge: 'Готово',
			badgeVariant: 'secondary',
		},
	];

	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Активность</CardTitle>
				<CardDescription>Лента событий в одной карточке</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className='flex flex-col gap-1.5'>
					{items.map((item, i) => {
						const Icon = item.icon;
						return (
							<li key={i}>
								<div className='flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5 transition-colors hover:bg-muted/45'>
									<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
										<Icon className='size-4' aria-hidden />
									</div>
									<div className='min-w-0 flex-1 pt-0.5'>
										<p className='text-sm font-medium leading-snug'>{item.title}</p>
										<p className='mt-0.5 text-xs text-muted-foreground'>{item.meta}</p>
									</div>
									<Badge variant={item.badgeVariant} className='shrink-0 text-[10px] font-normal'>
										{item.badge}
									</Badge>
								</div>
							</li>
						);
					})}
				</ul>
			</CardContent>
		</Card>
	);
}
