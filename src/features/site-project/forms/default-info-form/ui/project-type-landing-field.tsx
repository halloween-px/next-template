'use client';

import { SITE_PROJECT_KIND_OPTIONS } from '@/lib/validations/site-project';
import { Badge } from '@/kit/components/ui/badge';
import { cn } from '@/lib/utils';
import { LayoutTemplate, Lock } from 'lucide-react';

const landingOption = SITE_PROJECT_KIND_OPTIONS.find((o) => o.value === 'landing')!;
const comingSoonOptions = SITE_PROJECT_KIND_OPTIONS.filter((o) => o.value !== 'landing');

/** Только лендинг доступен; остальные типы — в компактном списке «позже». */
export function ProjectTypeLandingField() {
	return (
		<div className='space-y-6'>
			<div>
				<p className='text-sm font-medium text-foreground'>Тип сайта</p>
				<p className='mt-1 text-xs leading-relaxed text-muted-foreground'>
					Сейчас доступен только лендинг — одна страница из блоков kit.
				</p>
			</div>

			<div
				className={cn(
					'rounded-xl border border-border/80 bg-muted/20 px-4 py-3.5',
					'border-l-[3px] border-l-primary/35',
				)}>
				<div className='flex gap-3'>
					<span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm ring-1 ring-border/50'>
						<LayoutTemplate className='size-5' aria-hidden />
					</span>
					<div className='min-w-0 flex-1'>
						<div className='flex flex-wrap items-center gap-2'>
							<span className='text-sm font-semibold tracking-tight'>{landingOption.label}</span>
							<Badge variant='secondary' className='text-[10px] font-medium'>
								Сейчас
							</Badge>
						</div>
						<p className='mt-1.5 text-xs leading-relaxed text-muted-foreground'>
							{landingOption.description}
						</p>
					</div>
				</div>
			</div>

			<div>
				<p className='mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground'>Позже</p>
				<p className='mb-3 text-xs text-muted-foreground'>
					Эти форматы появятся в следующих версиях — без смены аккаунта сможете создать новый проект другого типа.
				</p>
				<ul className='divide-y divide-border/50 rounded-lg border border-border/60 bg-muted/10'>
					{comingSoonOptions.map((opt) => (
						<li key={opt.value} className='flex gap-3 px-3 py-2.5 sm:px-3.5'>
							<Lock
								className='mt-0.5 size-3.5 shrink-0 text-muted-foreground/55'
								strokeWidth={2}
								aria-hidden
							/>
							<div className='min-w-0'>
								<p className='text-sm font-medium leading-snug text-muted-foreground'>{opt.label}</p>
								<p className='mt-0.5 text-[11px] leading-snug text-muted-foreground/85'>{opt.description}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
