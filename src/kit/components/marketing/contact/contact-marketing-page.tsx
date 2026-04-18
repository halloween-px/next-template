'use client';

import { Container } from '@/kit/components/shared/container';
import { Badge } from '@/kit/components/ui/badge';
import { Button } from '@/kit/components/ui/button';
import { PUBLIC_CONTACT } from '@/config/contact-public';
import { PRODUCT_NAME } from '@/config/product';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Mail, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

const easeOut = [0.22, 1, 0.36, 1] as const;

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

const rowReveal = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.12 },
	},
};

const rowItem = {
	hidden: { opacity: 0, y: 16 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.45, ease: easeOut },
	},
};

const channels = [
	{
		key: 'phone',
		label: 'Телефон',
		value: PUBLIC_CONTACT.phoneDisplay,
		href: PUBLIC_CONTACT.phoneHref,
		icon: Phone,
		external: false,
	},
	{
		key: 'email',
		label: 'Email',
		value: PUBLIC_CONTACT.email,
		href: PUBLIC_CONTACT.emailHref,
		icon: Mail,
		external: false,
	},
	{
		key: 'github',
		label: PUBLIC_CONTACT.githubLabel,
		value: PUBLIC_CONTACT.githubUrl.replace(/^https?:\/\//, ''),
		href: PUBLIC_CONTACT.githubUrl,
		icon: Github,
		external: true,
	},
] as const;

export function ContactMarketingPage() {
	const reduceMotion = useReducedMotion();

	return (
		<div className='relative'>
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
				className='pointer-events-none absolute left-1/4 top-40 -z-10 size-[420px] rounded-full bg-violet-500/12 blur-3xl'
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
								<MessageCircle className='size-3.5' aria-hidden />
								Контакты
							</Badge>
						</motion.div>
						<motion.h1
							variants={fadeUp}
							className='mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.08]'>
							<span className='bg-linear-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent'>
								На связи
							</span>
						</motion.h1>
						<motion.div
							variants={fadeUp}
							className='mt-8 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl'>
							<p>
								Нужен индивидуальный сайт, доработка блоков под ваш бренд или сборка «своего» на базе{' '}
								{PRODUCT_NAME}? Опишите задачу — подскажем по срокам и формату.
							</p>
							<p className='text-base md:text-lg'>
								Можно начать с готового набора секций и постепенно усложнять: тексты, тема, структура
								страниц — пишите, разберёмся вместе.
							</p>
						</motion.div>
					</div>
				</Container>

				<Container className='mt-14 md:mt-20'>
					<motion.div
						variants={rowReveal}
						initial={reduceMotion ? 'show' : 'hidden'}
						whileInView='show'
						viewport={{ once: true, margin: '-40px' }}
						className='mx-auto max-w-xl'>
						<motion.h2
							variants={rowItem}
							className='text-center text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
							Как с нами связаться
						</motion.h2>
						<ul className='mt-8 flex flex-col gap-3'>
							{channels.map((ch) => {
								const Icon = ch.icon;
								return (
									<motion.li key={ch.key} variants={rowItem}>
										<a
											href={ch.href}
											target={ch.external ? '_blank' : undefined}
											rel={ch.external ? 'noopener noreferrer' : undefined}
											className={cn(
												'group flex items-center gap-4 rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur-sm transition-all',
												'hover:border-primary/35 hover:bg-card hover:shadow-md hover:shadow-primary/10',
												'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
											)}>
											<span className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18'>
												<Icon className='size-6 text-primary' aria-hidden />
											</span>
											<div className='min-w-0 flex-1 text-left'>
												<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
													{ch.label}
												</p>
												<p className='mt-0.5 truncate font-medium text-foreground group-hover:text-primary'>
													{ch.value}
												</p>
											</div>
											<ArrowRight className='size-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' aria-hidden />
										</a>
									</motion.li>
								);
							})}
						</ul>

						<motion.div variants={rowItem} className='mt-12 flex justify-center'>
							<Button variant='outline' className='gap-2' asChild>
								<Link href={ROUTES.features}>
									Возможности {PRODUCT_NAME}
									<ArrowRight className='size-4' aria-hidden />
								</Link>
							</Button>
						</motion.div>
					</motion.div>
				</Container>
			</motion.article>
		</div>
	);
}
