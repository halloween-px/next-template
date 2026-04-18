'use client';

import { Button } from '@/kit/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { MapPin } from 'lucide-react';

export function ProjectCoverMediaCard() {
	return (
		<Card className='gap-0 overflow-hidden border-border/60 bg-card p-0'>
			<div className='relative aspect-16/10 w-full bg-muted'>
				<img
					src='/images/hero/success-growth-abstract.jpg'
					alt=''
					className='h-full w-full object-cover'
					loading='lazy'
					decoding='async'
				/>
				<div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 to-transparent p-4'>
					<p className='text-sm font-medium'>Плитка с фото</p>
					<p className='text-xs text-muted-foreground'>object-cover + gradient</p>
				</div>
			</div>
			<CardHeader className='pt-6'>
				<CardTitle className='text-base'>Проект «Север»</CardTitle>
				<CardDescription className='flex items-center gap-1.5'>
					<MapPin className='size-3.5 shrink-0' aria-hidden />
					Москва · обновлено сегодня
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-wrap gap-2 pb-6 pt-6'>
				<Button size='sm'>Открыть</Button>
				<Button size='sm' variant='outline'>
					В избранное
				</Button>
			</CardContent>
		</Card>
	);
}
