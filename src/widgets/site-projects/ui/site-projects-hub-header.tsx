'use client';

import { PRODUCT_NAME } from '@/config/product';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { FolderKanban, Layers, Palette, Sparkles } from 'lucide-react';

const easeOut = [0.22, 1, 0.36, 1] as const;

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.04 },
	},
};

const item = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: easeOut },
	},
};

const chips = [
	{ icon: Layers, label: 'Блоки и секции' },
	{ icon: Palette, label: 'Тема и палитры' },
	{ icon: FolderKanban, label: 'Превью как в редакторе' },
] as const;

export function SiteProjectsHubHeader() {
	const reduceMotion = useReducedMotion();

	return (
		<motion.header
			className='mb-12 max-w-3xl md:mb-16'
			variants={container}
			initial={reduceMotion ? 'show' : 'hidden'}
			animate='show'>
			<motion.div variants={item}>
				<span className='inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
					<Sparkles className='size-3.5' aria-hidden />
					Рабочая область
				</span>
			</motion.div>

			<motion.h1
				variants={item}
				className='mt-5 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]'>
				<span className='bg-linear-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
					Мои сайты
				</span>{' '}
				в {PRODUCT_NAME}
			</motion.h1>

			<motion.p
				variants={item}
				className='mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-md'>
				Здесь ваши сохранённые проекты: откройте карточку — попадёте в превью и настройки. Новый
				сайт собирается из блоков того же kit, что и на лендинге продукта.
			</motion.p>

			<motion.ul
				variants={item}
				className='mt-8 flex flex-wrap gap-2.5'
				aria-label='Что можно настроить'>
				{chips.map(({ icon: Icon, label }) => (
					<li key={label}>
						<span
							className={cn(
								'inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/45 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm',
								'transition-colors hover:border-primary/30 hover:bg-muted/70'
							)}>
							<Icon className='size-3.5 shrink-0 text-primary' aria-hidden />
							{label}
						</span>
					</li>
				))}
			</motion.ul>
		</motion.header>
	);
}
