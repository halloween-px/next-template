'use client';

import type { ThemeDraft } from '@/entities/site-theme/model/theme-draft';
import { Button } from '@/kit/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/kit/components/ui/card';
import { Input } from '@/kit/components/ui/input';
import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';

type Props = {
	value: ThemeDraft;
	onChange: (next: ThemeDraft) => void;
};

export function ThemeLab({ value, onChange }: Props) {
	const patch = (partial: Partial<ThemeDraft>) => onChange({ ...value, ...partial });

	return (
		<div className='grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]'>
			<aside className='space-y-4 rounded-xl border border-border bg-card p-4'>
				<div>
					<h3 className='text-sm font-semibold'>Тема</h3>
					<p className='text-xs text-muted-foreground'>Настройки попадут в конфиг проекта.</p>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='tl-mode'>Режим</Label>
					<Select
						value={value.mode}
						onValueChange={(v) => patch({ mode: v as ThemeDraft['mode'] })}>
						<SelectTrigger id='tl-mode' className='h-10 w-full'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='light'>Светлая</SelectItem>
							<SelectItem value='dark'>Тёмная</SelectItem>
							<SelectItem value='system'>Как в системе</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					<div className='space-y-2'>
						<Label htmlFor='tl-primary'>Primary</Label>
						<Input
							id='tl-primary'
							type='color'
							className='h-10 cursor-pointer'
							value={value.primary}
							onChange={(e) => patch({ primary: e.target.value })}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='tl-accent'>Accent</Label>
						<Input
							id='tl-accent'
							type='color'
							className='h-10 cursor-pointer'
							value={value.accent}
							onChange={(e) => patch({ accent: e.target.value })}
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='tl-radius'>Радиус</Label>
					<Select
						value={value.radius}
						onValueChange={(v) => patch({ radius: v as ThemeDraft['radius'] })}>
						<SelectTrigger id='tl-radius' className='h-10 w-full'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='sm'>S</SelectItem>
							<SelectItem value='md'>M</SelectItem>
							<SelectItem value='lg'>L</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='tl-neutral'>Нейтраль</Label>
					<Select
						value={value.neutral}
						onValueChange={(v) => patch({ neutral: v as ThemeDraft['neutral'] })}>
						<SelectTrigger id='tl-neutral' className='h-10 w-full'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='slate'>Slate</SelectItem>
							<SelectItem value='zinc'>Zinc</SelectItem>
							<SelectItem value='neutral'>Neutral</SelectItem>
							<SelectItem value='stone'>Stone</SelectItem>
							<SelectItem value='gray'>Gray</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className='grid gap-3'>
					<div className='space-y-2'>
						<Label htmlFor='tl-h'>Шрифт заголовков</Label>
						<Input
							id='tl-h'
							value={value.fontHeading}
							onChange={(e) => patch({ fontHeading: e.target.value })}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='tl-b'>Шрифт текста</Label>
						<Input
							id='tl-b'
							value={value.fontBody}
							onChange={(e) => patch({ fontBody: e.target.value })}
						/>
					</div>
				</div>
			</aside>

			<div
				className='min-h-[420px] space-y-4 rounded-xl border border-dashed border-border p-4'
				style={{
					backgroundColor:
						value.mode === 'dark' ? 'oklch(0.15 0.01 260)' : 'oklch(0.98 0.01 260)',
					borderRadius:
						value.radius === 'sm' ? '0.375rem' : value.radius === 'lg' ? '1rem' : '0.5rem',
					fontFamily: `${value.fontBody}, system-ui, sans-serif`,
				}}>
				<p className='text-xs text-muted-foreground'>Превью (v1): дальше сюда подключим реальные блоки kit.</p>

				<div
					className='flex items-center justify-between rounded-lg border px-4 py-3'
					style={{ borderColor: value.primary, color: value.mode === 'dark' ? '#fafafa' : '#0a0a0a' }}>
					<span className='font-semibold' style={{ fontFamily: value.fontHeading }}>
						Header
					</span>
					<Button size='sm' style={{ backgroundColor: value.primary, color: '#fff' }}>
						CTA
					</Button>
				</div>

				<Card
					style={{
						borderColor: value.accent,
						backgroundColor: value.mode === 'dark' ? 'oklch(0.2 0.02 260)' : '#fff',
					}}>
					<CardHeader>
						<CardTitle style={{ fontFamily: value.fontHeading }}>Hero</CardTitle>
						<CardDescription>Краткий подзаголовок секции</CardDescription>
					</CardHeader>
					<CardContent className='flex gap-2'>
						<Button variant='outline'>Вторичная</Button>
						<Button style={{ backgroundColor: value.primary }}>Основная</Button>
					</CardContent>
				</Card>

				<div className='grid gap-3 sm:grid-cols-2'>
					<Card>
						<CardHeader>
							<CardTitle className='text-base'>Карточка</CardTitle>
						</CardHeader>
						<CardContent className='text-sm text-muted-foreground'>Описание услуги</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className='text-base'>Форма</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2'>
							<Input placeholder='Email' />
							<Button className='w-full' style={{ backgroundColor: value.accent }}>
								Отправить
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
