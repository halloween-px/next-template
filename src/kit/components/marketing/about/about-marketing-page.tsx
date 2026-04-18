'use client';

import { Container } from '@/kit/components/shared/container';
import { Badge } from '@/kit/components/ui/badge';
import { Button } from '@/kit/components/ui/button';
import { PRODUCT_NAME, PRODUCT_TAGLINE } from '@/config/product';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Layers, Sparkles, Target, Users } from 'lucide-react';
import Link from 'next/link';

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Вход страницы при монтировании — ощущение «перехода» при навигации */
const pageEnter = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.07, delayChildren: 0.06 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 22 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.48, ease: easeOut },
	},
};

const blockReveal = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.08 },
	},
};

const cardReveal = {
	hidden: { opacity: 0, y: 32 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.52, ease: easeOut },
	},
};

const pillars = [
	{
		icon: Layers,
		title: 'Единый kit',
		text: 'Блоки контента и маркетинг хоста живут в одном проекте — меньше расхождений между лендингом и превью сайта.',
	},
	{
		icon: Target,
		title: 'Скорость итераций',
		text: 'Конфигурация страниц и темы без пересборки «витрины» для каждого блока — быстрее показывать результат заказчику.',
	},
	{
		icon: Users,
		title: 'Рост продукта',
		text: 'Аутентификация, проекты в MongoDB и API под рукой — можно наращивать функции, не меняя стек с нуля.',
	},
];

export function AboutMarketingPage() {
	const reduceMotion = useReducedMotion();

	return (
		<div className='relative'>
			{/* Фон в духе hero — короче по высоте */}
			<div
				className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(72vh,680px)] bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,hsl(var(--primary)/0.2),transparent)]'
				aria-hidden
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(72vh,680px)] opacity-[0.3]',
					'bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]',
					'bg-size-[4rem_4rem]',
				)}
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute right-0 top-32 -z-10 size-96 rounded-full bg-primary/12 blur-3xl'
				aria-hidden
			/>

			<motion.article
				variants={pageEnter}
				initial={reduceMotion ? 'show' : 'hidden'}
				animate='show'
				className='relative pb-20 pt-12 md:pb-28 md:pt-16'>
				<Container>
					<motion.div variants={fadeUp}>
						<Link
							href='/'
							className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
							<ArrowLeft className='size-4' aria-hidden />
							На главную
						</Link>
					</motion.div>

					<div className='mx-auto max-w-3xl text-center'>
						<motion.div variants={fadeUp}>
							<Badge
								variant='outline'
								className='gap-1.5 border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
								<Sparkles className='size-3.5' aria-hidden />
								О продукте
							</Badge>
						</motion.div>

						<motion.h1
							variants={fadeUp}
							className='mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.08]'>
							Мы делаем{' '}
							<span className='bg-linear-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
								{PRODUCT_NAME}
							</span>{' '}
							как основу для ваших сайтов
						</motion.h1>

						<motion.p
							variants={fadeUp}
							className='mt-6 text-pretty text-lg text-muted-foreground md:text-xl'>
							{PRODUCT_TAGLINE} Это не набор случайных блоков, а связка маркетинга, редактора превью, API и
							базы — чтобы вы меньше возились с инфраструктурой и быстрее выходили к пользователям.
						</motion.p>

						<motion.div
							variants={fadeUp}
							className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
							<Button size='lg' className='px-8 shadow-lg shadow-primary/20' asChild>
								<Link href={ROUTES.template}>
									Мои сайты
									<ArrowRight className='size-4' aria-hidden />
								</Link>
							</Button>
							<Button size='lg' variant='outline' className='border-border/80 bg-background/80' asChild>
								<Link href='/register'>Создать аккаунт</Link>
							</Button>
						</motion.div>
					</div>
				</Container>

				<Container className='mt-20 md:mt-24'>
					<motion.div
						variants={blockReveal}
						initial={reduceMotion ? 'show' : 'hidden'}
						whileInView='show'
						viewport={{ once: true, margin: '-60px' }}>
						<motion.h2
							variants={cardReveal}
							className='text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
							Три опоры подхода
						</motion.h2>
						<motion.p
							variants={cardReveal}
							className='mx-auto mt-3 max-w-2xl text-center text-muted-foreground'>
							То, на что мы опираемся, когда собираем и развиваем продукт.
						</motion.p>

						<div className='mt-12 grid gap-5 md:grid-cols-3 md:gap-6'>
							{pillars.map((pillar) => (
								<motion.div
									key={pillar.title}
									variants={cardReveal}
									whileHover={
										reduceMotion
											? undefined
											: { y: -5, transition: { duration: 0.35, ease: easeOut } }
									}
									className='group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-md transition-colors hover:border-primary/30 md:p-7'>
									<div
										className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
										aria-hidden
									/>
									<pillar.icon className='relative mb-4 size-10 text-primary' aria-hidden />
									<h3 className='relative text-lg font-semibold text-foreground'>{pillar.title}</h3>
									<p className='relative mt-2 text-sm leading-relaxed text-muted-foreground'>
										{pillar.text}
									</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</Container>

				<Container className='mt-16 md:mt-20'>
					<motion.div
						initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
						whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.55, ease: easeOut }}
						className='relative overflow-hidden rounded-3xl border border-primary/25 bg-linear-to-br from-primary/15 via-muted/40 to-violet-500/10 px-8 py-10 text-center md:px-12 md:py-14'>
						<Heart className='mx-auto mb-4 size-10 text-primary' aria-hidden />
						<p className='mx-auto max-w-2xl text-lg font-medium text-foreground md:text-xl'>
							Если вам откликается такой баланс скорости и структуры — откройте «Мои сайты» и собирайте свой
							первый сайт в превью.
						</p>
						<div className='mt-8 flex flex-wrap justify-center gap-3'>
							<Button size='lg' asChild>
								<Link href={ROUTES.template}>Открыть «Мои сайты»</Link>
							</Button>
							<Button size='lg' variant='secondary' asChild>
								<Link href='/'>На главную</Link>
							</Button>
						</div>
					</motion.div>
				</Container>
			</motion.article>
		</div>
	);
}
