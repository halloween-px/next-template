'use client';

import { cn } from '@/lib/utils';
import { openCreateSiteProjectModal } from '@/stores/modal-store';
import { Plus, Sparkles } from 'lucide-react';

export function CreateSiteProjectTrigger() {
	return (
		<button
			type='button'
			onClick={() => openCreateSiteProjectModal()}
			className={cn(
				'group relative isolate flex min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed py-8 text-center transition-all duration-300 sm:min-h-[220px] sm:py-10',
				'border-primary/35 bg-linear-to-br from-primary/9 via-card/60 to-violet-500/[0.07]',
				'shadow-sm shadow-primary/5 backdrop-blur-[2px]',
				'hover:border-primary/55 hover:shadow-lg hover:shadow-primary/20',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
			)}>
			<span
				className='pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,hsl(var(--border)/0.28)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.28)_1px,transparent_1px)] bg-size-[1.15rem_1.15rem]'
				aria-hidden
			/>
			<span
				className='pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/25 blur-3xl transition-opacity duration-500 opacity-70 group-hover:opacity-100'
				aria-hidden
			/>
			<span
				className='pointer-events-none absolute -bottom-12 -left-8 size-40 rounded-full bg-violet-500/20 blur-3xl transition-opacity duration-500 opacity-60 group-hover:opacity-90'
				aria-hidden
			/>

			<div className='relative flex flex-col items-center px-5'>
				<span className='mb-3 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary'>
					<Sparkles className='size-3' aria-hidden />
					Создать
				</span>
				<span
					className={cn(
						'flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/35 via-primary/20 to-primary/10',
						'ring-2 ring-primary/25 shadow-md shadow-primary/10 transition-transform duration-300',
						'group-hover:scale-[1.06] group-hover:ring-primary/40',
					)}>
					<Plus className='size-7 text-primary' strokeWidth={2.25} aria-hidden />
				</span>
				<span className='mt-4 text-base font-semibold tracking-tight text-foreground'>Новый сайт</span>
				<span className='mt-2 max-w-56 text-xs leading-relaxed text-muted-foreground'>
					Имя проекта и тип — конфиг сохранится в вашем аккаунте
				</span>
			</div>
		</button>
	);
}
