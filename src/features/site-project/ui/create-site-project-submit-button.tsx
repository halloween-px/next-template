'use client';

import { cn } from '@/lib/utils';
import { Loader2, Rocket } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	loading?: boolean;
	children?: React.ReactNode;
	/** Крупная CTA под блоком темы: высота как у списка «Позже», яркий градиент. */
	prominent?: boolean;
};

/**
 * Отдельная кнопка отправки формы создания проекта — не дефолтный primary kit.
 */
export function CreateSiteProjectSubmitButton({
	loading,
	disabled,
	className,
	children,
	prominent,
	...rest
}: Props) {
	return (
		<button
			type='submit'
			disabled={disabled || loading}
			className={cn(
				'group relative isolate flex w-full items-center justify-center overflow-hidden font-semibold tracking-tight',
				prominent
					? cn(
							'min-h-[12.5rem] flex-col gap-3 rounded-xl px-5 py-7 text-primary-foreground sm:min-h-[13rem]',
							'border-2 border-white/30 text-primary-foreground shadow-2xl',
							'shadow-[0_14px_48px_-10px_hsl(var(--primary)/0.55),inset_0_1px_0_0_rgb(255_255_255/0.2)]',
							'transition-all duration-500 ease-out will-change-transform',
							'hover:-translate-y-0.5 hover:border-white/45 hover:shadow-[0_22px_56px_-12px_hsl(var(--primary)/0.65),inset_0_1px_0_0_rgb(255_255_255/0.28)]',
							'active:translate-y-0 active:scale-[0.995] active:duration-200',
							'motion-safe:hover:scale-[1.015]',
						)
					: cn(
							'gap-2.5 rounded-xl px-6 py-3.5 text-base transition-all duration-300',
							'border-2 border-primary/35 bg-linear-to-br from-primary/12 via-card to-violet-500/10 text-foreground shadow-md',
							'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
						),
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
				'disabled:pointer-events-none disabled:opacity-55',
				className,
			)}
			{...rest}>
			{prominent ? (
				<>
					{/* Анимированный градиент */}
					<span
						className={cn(
							'pointer-events-none absolute inset-0 rounded-[10px] bg-linear-to-br from-primary via-violet-500 to-indigo-800 bg-size-[220%_220%] bg-position-[0%_40%]',
							'motion-safe:animate-[create-project-cta-gradient_11s_ease-in-out_infinite]',
							'create-project-cta-anim',
						)}
						aria-hidden
					/>
					{/* Мягкое затемнение снизу */}
					<span
						className='pointer-events-none absolute inset-0 rounded-[10px] bg-linear-to-t from-black/35 via-black/5 to-transparent'
						aria-hidden
					/>
					{/* Верхний блик */}
					<span
						className='pointer-events-none absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent opacity-90'
						aria-hidden
					/>
					{/* Блик-шиммер */}
					<span
						className='pointer-events-none absolute inset-0 overflow-hidden rounded-[10px]'
						aria-hidden>
						<span
							className={cn(
								'absolute -left-1/2 top-0 h-full w-[45%] bg-linear-to-r from-transparent via-white/35 to-transparent',
								'motion-safe:animate-[create-project-cta-shimmer_4.2s_ease-in-out_infinite]',
								'create-project-cta-anim',
							)}
						/>
					</span>
					{/* Медленное «ореол»-пятно */}
					<span
						className={cn(
							'pointer-events-none absolute -right-6 -top-16 size-40 rounded-full bg-violet-400/35 blur-3xl',
							'motion-safe:animate-[create-project-cta-orbit_18s_linear_infinite]',
							'create-project-cta-anim',
						)}
						aria-hidden
					/>
					<span
						className={cn(
							'pointer-events-none absolute -bottom-10 -left-8 size-36 rounded-full bg-primary/40 blur-3xl',
							'motion-safe:animate-[create-project-cta-orbit_22s_linear_infinite_reverse]',
							'create-project-cta-anim opacity-70',
						)}
						aria-hidden
					/>
				</>
			) : (
				<span
					className='pointer-events-none absolute inset-0 bg-linear-to-r from-primary/15 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
					aria-hidden
				/>
			)}

			{loading ? (
				<span className='relative flex flex-col items-center gap-3'>
					<Loader2
						className={cn(
							'shrink-0 animate-spin text-primary-foreground drop-shadow-md',
							prominent ? 'size-11' : 'size-5 text-primary',
						)}
						aria-hidden
					/>
					<span
						className={cn(
							'text-lg font-semibold drop-shadow-sm',
							prominent && 'text-primary-foreground',
						)}>
						Создаём проект…
					</span>
				</span>
			) : prominent ? (
				<span className='relative flex flex-col items-center justify-center gap-3 text-center'>
					<span className='flex items-center gap-3.5'>
						<span className='relative flex size-12 items-center justify-center rounded-2xl bg-white/15 shadow-inner ring-1 ring-white/25 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-110 group-hover:bg-white/22 motion-safe:group-hover:rotate-[-6deg]'>
							<Rocket
								className='size-8 text-primary-foreground drop-shadow-lg transition-transform duration-500 group-hover:-translate-y-1'
								strokeWidth={2.25}
								aria-hidden
							/>
						</span>
						<span className='text-left'>
							<span className='block text-2xl font-bold tracking-tight drop-shadow-md md:text-[1.65rem] md:leading-tight'>
								{children ?? 'Создать проект'}
							</span>
						</span>
					</span>
					<span className='max-w-[18rem] text-sm font-medium leading-snug text-primary-foreground/92 drop-shadow-sm'>
						Откроется редактор — превью лендинга и блоки kit
					</span>
				</span>
			) : (
				<>
					<Rocket
						className='relative size-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5'
						aria-hidden
					/>
					<span className='relative'>{children ?? 'Создать проект'}</span>
				</>
			)}
		</button>
	);
}
