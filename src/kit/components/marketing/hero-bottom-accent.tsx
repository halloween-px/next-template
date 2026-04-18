'use client';

import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BAR_COUNT = 15;
const easeWave = [0.45, 0, 0.55, 1] as const;

export function HeroBottomAccent() {
	const reduceMotion = useReducedMotion();

	return (
		<div className='relative z-10 flex w-full flex-col items-center pb-8 pt-10 md:pb-10 md:pt-2'>
			<div
				className='pointer-events-none absolute inset-x-0 bottom-0 top-0 -z-10 bg-linear-to-t from-background via-background/88 to-transparent'
				aria-hidden
			/>

			<motion.div
				initial={reduceMotion ? false : { opacity: 0, scaleX: 0.82 }}
				animate={reduceMotion ? undefined : { opacity: 1, scaleX: 1 }}
				transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
				className='relative mb-7 h-[2px] w-[min(92vw,30rem)] overflow-hidden rounded-full'>
				<div className='absolute inset-0 bg-border/45' aria-hidden />
				{reduceMotion ? (
					<div
						className='absolute inset-y-0 left-[18%] w-[64%] rounded-full bg-linear-to-r from-transparent via-primary/70 to-transparent'
						aria-hidden
					/>
				) : (
					<motion.div
						className='absolute inset-y-0 w-[38%] rounded-full bg-linear-to-r from-transparent via-primary via-violet-400/85 to-transparent opacity-95 blur-[0.5px]'
						initial={{ left: '-35%' }}
						animate={{ left: ['-35%', '135%'] }}
						transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
						aria-hidden
					/>
				)}
			</motion.div>

			<div
				className='pointer-events-none flex h-14 items-end justify-center gap-[4px] sm:gap-[5px]'
				aria-hidden>
				{Array.from({ length: BAR_COUNT }).map((_, i) => {
					const phase = i * 0.14;
					const baseScale = 0.28 + (i % 5) * 0.09;
					return (
						<motion.div
							key={i}
							className={cn(
								'w-[3px] rounded-full bg-linear-to-t from-primary/25 via-primary/75 to-primary sm:w-1',
								'shadow-[0_0_14px_-2px_hsl(var(--primary)/0.55)]'
							)}
							style={{ height: 52, transformOrigin: 'bottom' }}
							animate={
								reduceMotion
									? { scaleY: 0.42 + (i % 4) * 0.06 }
									: {
											scaleY: [baseScale, 0.92 + (i % 3) * 0.03, 0.38, 0.78, baseScale + 0.06],
										}
							}
							transition={
								reduceMotion
									? { duration: 0 }
									: {
											duration: 2.1 + (i % 5) * 0.15,
											repeat: Infinity,
											delay: phase,
											ease: easeWave,
										}
							}
						/>
					);
				})}
			</div>

			<motion.div
				className='pointer-events-auto mt-10 md:mt-11'
				initial={reduceMotion ? false : { opacity: 0, y: 10 }}
				animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
				transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}>
				<Link
					href={ROUTES.features}
					className={cn(
						'group inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/35 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm outline-none transition-all',
						'hover:border-primary/35 hover:bg-muted/50 hover:shadow-md hover:shadow-primary/10',
						'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
					)}>
					<span>Смотреть возможности</span>
					{reduceMotion ? (
						<ArrowRight className='size-4 shrink-0 opacity-80' aria-hidden />
					) : (
						<motion.span
							className='inline-flex'
							animate={{ x: [0, 4, 0] }}
							transition={{
								duration: 1.45,
								repeat: Infinity,
								ease: easeWave,
							}}>
							<ArrowRight
								className='size-4 shrink-0 text-primary opacity-90 transition-transform group-hover:translate-x-0.5'
								aria-hidden
							/>
						</motion.span>
					)}
				</Link>
			</motion.div>
		</div>
	);
}
