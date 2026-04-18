'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/kit/components/ui/tabs';

export function TabsOutlineShowcaseCard() {
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Вкладки</CardTitle>
				<CardDescription>Tabs, список и контент</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue='overview' className='w-full'>
					<TabsList className='flex h-auto w-full flex-wrap gap-1 p-1'>
						<TabsTrigger value='overview' className='min-w-0 flex-1'>
							Обзор
						</TabsTrigger>
						<TabsTrigger value='details' className='min-w-0 flex-1'>
							Детали
						</TabsTrigger>
						<TabsTrigger value='files' className='min-w-0 flex-1'>
							Файлы
						</TabsTrigger>
					</TabsList>
					<TabsContent value='overview' className='mt-3 text-sm text-muted-foreground'>
						Краткое описание и ключевые показатели.
					</TabsContent>
					<TabsContent value='details' className='mt-3 text-sm text-muted-foreground'>
						Параметры, история изменений, метаданные.
					</TabsContent>
					<TabsContent value='files' className='mt-3 text-sm text-muted-foreground'>
						Вложения и ссылки на документы.
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
