'use client';

import { Avatar, AvatarFallback } from '@/kit/components/ui/avatar';
import { Button } from '@/kit/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { ArrowUpRight } from 'lucide-react';

/** Список людей с аватарами */
export function TeamAvatarsRowCard() {
	const people = [
		{ name: 'Анна Волкова', role: 'Design', initials: 'АВ' },
		{ name: 'Илья Ким', role: 'Engineering', initials: 'ИК' },
		{ name: 'Мара Сингх', role: 'Product', initials: 'МС' },
	] as const;
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Участники</CardTitle>
				<CardDescription>Avatar + Badge</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-3'>
				{people.map((p) => (
					<div
						key={p.name}
						className='flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2.5'>
						<Avatar className='size-10'>
							<AvatarFallback className='text-xs font-medium'>{p.initials}</AvatarFallback>
						</Avatar>
						<div className='min-w-0 flex-1'>
							<p className='truncate text-sm font-medium'>{p.name}</p>
							<p className='truncate text-xs text-muted-foreground'>{p.role}</p>
						</div>
						<Button size='icon-sm' variant='ghost' className='shrink-0' aria-label='Профиль'>
							<ArrowUpRight className='size-4' />
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
