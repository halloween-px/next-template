'use client';

import { Container } from '@/kit/components/shared/container';
import { Badge } from '@/kit/components/ui/badge';
import { Button } from '@/kit/components/ui/button';
import { PRODUCT_NAME, PRODUCT_TAGLINE } from '@/config/product';
import { ROUTES } from '@/config/routes';
import { useUserContext } from '@/kit/components/providers/user-provider';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const highlights = ['App Router', 'TypeScript', 'MongoDB', 'TanStack Query'];

const easeOut = [0.22, 1, 0.36, 1] as const;

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.07, delayChildren: 0.06 },
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

export function HeroMarketingContent() {
	const { user } = useUserContext();

	return (
		<Container>
			<motion.div
				className='mx-auto flex max-w-3xl flex-col items-center text-center'
				variants={container}
				initial='hidden'
				animate='show'>
				<motion.div variants={item}>
					<Badge
						variant='outline'
						className='mb-4 gap-1.5 border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
						<Sparkles className='size-3.5' aria-hidden />
						{PRODUCT_NAME}
					</Badge>
				</motion.div>

				<motion.p
					variants={item}
					className='max-w-xl text-pretty text-base font-medium leading-snug text-foreground md:text-lg'>
					{PRODUCT_TAGLINE}
				</motion.p>

				<motion.h1
					variants={item}
					className='mt-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.1]'>
					Запускайте интерфейсы{' '}
					<span className='bg-linear-to-r from-primary via-primary to-violet-400 bg-clip-text text-transparent'>
						быстрее
					</span>
					, без лишней возни
				</motion.h1>

				<motion.p
					variants={item}
					className='mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl'>
					Единый стек для маркетинговых страниц и редактируемых превью: блоки, тема, API и данные — всё
					согласовано в одном репозитории.
				</motion.p>

				<motion.ul
					variants={item}
					className='mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground'>
					{highlights.map((label) => (
						<li key={label} className='flex items-center gap-1.5'>
							<CheckCircle2 className='size-4 shrink-0 text-primary' aria-hidden />
							{label}
						</li>
					))}
				</motion.ul>

				<motion.div
					variants={item}
					className='mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center'>
					<Button size='lg' className='px-8 shadow-lg shadow-primary/25' asChild>
						<Link href={ROUTES.template}>
							Мои сайты
							<ArrowRight className='size-4' aria-hidden />
						</Link>
					</Button>
					{user ? null : (
						<Button
							size='lg'
							variant='outline'
							className='border-border/80 bg-background/60 backdrop-blur-sm'
							asChild>
							<Link href='/register'>Создать аккаунт</Link>
						</Button>
					)}
				</motion.div>

				{user ? null : (
					<motion.p variants={item} className='mt-6 text-xs text-muted-foreground'>
						Уже есть аккаунт?{' '}
						<Link href='/login' className='font-medium text-primary underline-offset-4 hover:underline'>
							Войти
						</Link>
					</motion.p>
				)}
			</motion.div>
		</Container>
	);
}
