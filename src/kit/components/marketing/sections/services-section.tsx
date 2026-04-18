'use client';

import { Container } from '@/kit/components/shared/container';
import { Badge } from '@/kit/components/ui/badge';
import { ParallaxDevIconsBackground } from '@/kit/components/marketing/parallax-dev-icons';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Blocks, Database, Layers, Rocket, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const easeOut = [0.22, 1, 0.36, 1] as const;

type Spot = 'hero' | 'side' | 'banner';

type Service = {
	icon: LucideIcon;
	title: string;
	tagline: string;
	description: string;
	spot: Spot;
	accent: string;
	glow: string;
};

const services: Service[] = [
	{
		icon: Layers,
		title: 'Компонуемый kit',
		tagline: 'Сборка страниц из блоков',
		description:
			'Hero, услуги, команда и другие секции подключаются из конфигурации — без копипасты JSX и рассинхрона с превью.',
		spot: 'hero',
		accent: 'from-emerald-400/90 via-primary to-cyan-500/90',
		glow: 'shadow-emerald-500/20',
	},
	{
		icon: Database,
		title: 'MongoDB & API',
		tagline: 'Данные рядом с UI',
		description:
			'Mongoose, проекты пользователя, сохранение конфигурации сайта и защищённые маршруты в одном приложении.',
		spot: 'side',
		accent: 'from-violet-400/90 via-primary to-fuchsia-500/85',
		glow: 'shadow-violet-500/15',
	},
	{
		icon: ShieldCheck,
		title: 'Безопасность',
		tagline: 'Сессии и доступ',
		description:
			'Регистрация, вход, httpOnly cookie и проверка на сервере до отдачи закрытых страниц.',
		spot: 'side',
		accent: 'from-amber-400/85 via-orange-500/80 to-rose-500/75',
		glow: 'shadow-amber-500/15',
	},
	{
		icon: Blocks,
		title: 'Тема и превью',
		tagline: 'Видите результат сразу',
		description:
			'Палитры и слои темы в превью: правки отражаются в интерфейсе без отдельной витрины компонентов для каждого блока.',
		spot: 'banner',
		accent: 'from-sky-400/90 via-primary to-indigo-500/90',
		glow: 'shadow-sky-500/15',
	},
];

const headerBlock = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.09, delayChildren: 0.05 },
	},
};

const headerItem = {
	hidden: { opacity: 0, y: 22 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const bentoContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.11, delayChildren: 0.06 },
	},
};

const cellShow = {
	hidden: { opacity: 0, y: 40, scale: 0.96 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.55, ease: easeOut },
	},
};

function FeatureCard({ service }: { service: Service }) {
	const Icon = service.icon;
	const isHero = service.spot === 'hero';
	const isBanner = service.spot === 'banner';

	return (
		<div className='group relative h-full min-h-0'>
			<div
				className={cn(
					'pointer-events-none absolute -inset-px rounded-[inherit] opacity-35 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.65]',
					'bg-linear-to-br',
					service.accent,
				)}
				aria-hidden
			/>

			<div
				className={cn(
					'relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10',
					'bg-linear-to-br from-card/95 via-card/70 to-muted/40',
					'dark:border-white/8 dark:from-card/90 dark:via-card/55',
					'backdrop-blur-2xl transition-[box-shadow,border-color] duration-300',
					'shadow-2xl',
					service.glow,
					'group-hover:border-primary/35',
				)}>
				<div className={cn('h-1.5 w-full shrink-0 bg-linear-to-r', service.accent)} aria-hidden />

				<Icon
					className={cn(
						'pointer-events-none absolute text-primary',
						isHero
							? '-right-4 bottom-0 size-[min(52vw,280px)] opacity-[0.08] md:-right-8 md:size-[320px]'
							: isBanner
								? 'right-[4%] top-1/2 size-40 -translate-y-1/2 opacity-[0.1] md:size-52'
								: '-right-2 top-6 size-32 opacity-[0.09] md:size-36',
					)}
					strokeWidth={1}
					aria-hidden
				/>

				<div
					className={cn(
						'relative z-1 flex flex-1 flex-col',
						isHero ? 'p-8 md:p-10 lg:p-12' : isBanner ? 'p-8 md:p-10' : 'p-6 md:p-7',
					)}>
					<div className='mb-4 flex flex-wrap items-center gap-3'>
						<span className='inline-flex size-12 items-center justify-center rounded-2xl bg-primary/15 shadow-inner ring-1 ring-inset ring-primary/25 md:size-14'>
							<Icon className={cn('size-6 text-primary md:size-7', isHero && 'md:size-8')} aria-hidden />
						</span>
						<span className='rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
							{service.spot === 'hero' ? 'Фундамент' : service.spot === 'banner' ? 'Инструмент' : 'Слой'}
						</span>
					</div>

					<h3
						className={cn(
							'font-bold tracking-tight text-foreground',
							isHero ? 'text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]' : 'text-xl md:text-2xl',
						)}>
						{service.title}
					</h3>
					<p className={cn('mt-2 font-medium text-primary', isHero ? 'text-base md:text-lg' : 'text-sm')}>
						{service.tagline}
					</p>
					<p
						className={cn(
							'mt-4 text-muted-foreground',
							isHero ? 'max-w-xl text-base leading-relaxed md:text-[17px]' : 'text-sm leading-relaxed',
						)}>
						{service.description}
					</p>
				</div>
			</div>
		</div>
	);
}

export function ServicesSection() {
	const reduceMotion = useReducedMotion();

	const kit = services[0];
	const db = services[1];
	const shield = services[2];
	const theme = services[3];

	return (
		<section
			id='start'
			className='relative isolate scroll-mt-[calc(var(--height-header)+1rem)] overflow-hidden py-20 md:py-28 lg:py-32'>
			{/* Фон как в HeroSection */}
			<div
				className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.22),transparent)]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-border to-transparent'
				aria-hidden
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-0 -z-10 opacity-[0.35]',
					'bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]',
					'bg-size-[4rem_4rem]',
				)}
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -right-24 top-24 -z-10 size-112 rounded-full bg-primary/15 blur-3xl md:size-144'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -left-32 bottom-0 -z-10 size-88 rounded-full bg-violet-500/10 blur-3xl md:size-112'
				aria-hidden
			/>
			<ParallaxDevIconsBackground />

			<Container>
				<motion.div
					className='mx-auto mb-14 max-w-4xl text-center lg:mb-20'
					variants={headerBlock}
					initial={reduceMotion ? 'show' : 'hidden'}
					whileInView='show'
					viewport={{ once: true, margin: '-80px' }}>
					<motion.div variants={headerItem}>
						<Badge
							className={cn(
								'mb-6 inline-flex items-center gap-2 border-primary/30 bg-primary/15 px-4 py-1.5',
								'text-xs font-bold uppercase tracking-[0.2em] text-primary',
							)}>
							<Rocket className='size-3.5' aria-hidden />
							Возможности
						</Badge>
					</motion.div>
					<motion.h2
						variants={headerItem}
						className='text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.05]'>
						Всё, что нужно, чтобы{' '}
						<span className='bg-linear-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
							запустить продукт
						</span>
						, а не «ещё один репо»
					</motion.h2>
					<motion.p
						variants={headerItem}
						className='mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl'>
						Один стек: маркетинг хоста, блоки сайта в превью, API и база — без склейки пяти шаблонов из
						разных репозиториев.
					</motion.p>
				</motion.div>

				<motion.div
					className='grid auto-rows-auto grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-[1fr_1fr_auto]'
					variants={bentoContainer}
					initial={reduceMotion ? 'show' : 'hidden'}
					whileInView='show'
					viewport={{ once: true, margin: '-60px' }}>
					<motion.div
						variants={cellShow}
						whileHover={
							reduceMotion ? undefined : { scale: 1.008, transition: { duration: 0.35, ease: easeOut } }
						}
						className='lg:col-span-2 lg:row-span-2 lg:min-h-[420px]'>
						<FeatureCard service={kit} />
					</motion.div>
					<motion.div
						variants={cellShow}
						whileHover={
							reduceMotion ? undefined : { scale: 1.015, transition: { duration: 0.35, ease: easeOut } }
						}
						className='min-h-[180px] lg:min-h-0'>
						<FeatureCard service={db} />
					</motion.div>
					<motion.div
						variants={cellShow}
						whileHover={
							reduceMotion ? undefined : { scale: 1.015, transition: { duration: 0.35, ease: easeOut } }
						}
						className='min-h-[180px] lg:min-h-0'>
						<FeatureCard service={shield} />
					</motion.div>
					<motion.div
						variants={cellShow}
						whileHover={
							reduceMotion ? undefined : { scale: 1.008, transition: { duration: 0.35, ease: easeOut } }
						}
						className='lg:col-span-3'>
						<FeatureCard service={theme} />
					</motion.div>
				</motion.div>
			</Container>
		</section>
	);
}
