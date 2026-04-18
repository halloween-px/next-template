'use client';

import Image from 'next/image';
import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import { Badge } from '@/kit/components/ui/badge';
import { Container } from '@/kit/components/shared/container';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';
import { useSlider } from '@/kit/hooks/use-slider';
import type { THeroContent } from './type';

/**
 * Hero v2 — стеклянная карточка, кроссфейд фонов, переключение слайдов табами,
 * опционально eyebrow / tags / quote на слайде.
 */
export default function HeroV2({ slides, autoplay, interval }: THeroContent) {
	const { activeIndex, setActiveIndex, activeSlide: slide } = useSlider({
		slides,
		autoplay,
		interval,
	});

	if (!slides?.length) return null;

	return (
		<section className='relative min-h-[calc(100vh-var(--height-header))] w-full overflow-hidden'>
			{slides.map((s, index) => (
				<div
					key={`${s.title}-${index}`}
					className={cn(
						'absolute inset-0 transition-opacity duration-700 ease-out',
						index === activeIndex ? 'z-0 opacity-100' : 'pointer-events-none z-0 opacity-0'
					)}
					aria-hidden={index !== activeIndex}>
					<Image
						width={1920}
						height={1080}
						priority={index === 0}
						src={s.backgroundImage || '/placeholder.svg'}
						alt={s.title}
						className='h-full w-full object-cover'
					/>
					<div
						className='absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20 md:via-background/75'
						aria-hidden
					/>
					<div
						className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent'
						aria-hidden
					/>
				</div>
			))}

			<Container className='relative z-10 flex min-h-[calc(100vh-var(--height-header))] items-center py-14 md:py-20'>
				<div className='flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8'>
					<div className='relative flex w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/45 p-6 shadow-2xl backdrop-blur-xl md:p-8'>
						<div
							className='pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gradient-to-br from-primary/25 via-primary/5 to-transparent blur-3xl'
							aria-hidden
						/>
						<div
							className='pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-transparent blur-3xl'
							aria-hidden
						/>
						<div
							className='pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:20px_20px]'
							aria-hidden
						/>

						<div className='relative z-10 flex flex-col'>
							<div className='mb-5 flex flex-wrap gap-2'>
								{slides.map((_, i) => (
									<button
										key={i}
										type='button'
										onClick={() => setActiveIndex(i)}
										className={cn(
											'h-10 min-w-10 rounded-xl border transition-colors',
											i === activeIndex
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-border/60 bg-background/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
										)}
										aria-label={`Слайд ${i + 1}`}
										aria-current={i === activeIndex ? 'true' : undefined}>
										<Typography.Text
											as='span'
											size='sm'
											weight='semibold'
											className='tabular-nums text-inherit'>
											{String(i + 1).padStart(2, '0')}
										</Typography.Text>
									</button>
								))}
							</div>

							<div
								className='mb-6 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent'
								aria-hidden
							/>

							{slide.eyebrow ? (
								<Badge variant='secondary' className='mb-4 px-3 py-1'>
									<Typography.Text as='span' size='xs' weight='medium' className='text-inherit'>
										{slide.eyebrow}
									</Typography.Text>
								</Badge>
							) : null}

							<Typography.Title level={4} as='h1' weight='bold' className='text-pretty'>
								{slide.title}
							</Typography.Title>
							<Typography.Text size='base' color='muted' className='mt-3 text-pretty md:text-lg'>
								{slide.description}
							</Typography.Text>

							{slide.leftAccent != null && slide.leftAccent.images.length > 0 ? (
								<div className='mt-8 rounded-2xl border border-border/50 bg-muted/15 p-4 md:p-5'>
									{slide.leftAccent.label ? (
										<Typography.Title level={6} className='mb-3 text-primary'>
											{slide.leftAccent.label}
										</Typography.Title>
									) : null}
									<div className='flex items-center'>
										<div className='flex -space-x-4'>
											{slide.leftAccent.images.map((img, idx) => (
												<div
													key={`${img.src}-${idx}`}
													className={cn(
														'relative h-16 w-16 overflow-hidden rounded-2xl shadow-md ring-4 ring-background/80',
														idx === 0 && 'z-30',
														idx === 1 && 'z-20',
														idx === 2 && 'z-10'
													)}>
													<Image
														src={img.src}
														alt={img.alt}
														width={64}
														height={64}
														className='h-full w-full object-cover'
													/>
												</div>
											))}
										</div>
									</div>
									{slide.leftAccent.caption ? (
										<Typography.Text
											size='sm'
											color='muted'
											className='mt-4 max-w-xl text-pretty leading-relaxed'>
											{slide.leftAccent.caption}
										</Typography.Text>
									) : null}
								</div>
							) : null}

							<div className='mt-8 flex flex-wrap gap-3'>
								{slide.buttons.map((button, i) => (
									<KitCtaButton
										key={`${button.link}-${i}`}
										href={button.link}
										label={button.label}
										modal={button.modal}
										size='lg'
										variant={i === 0 ? 'default' : 'outline'}
									/>
								))}
							</div>

							{slide.tags != null && slide.tags.length > 0 ? (
								<div className='mt-8 flex flex-wrap gap-2'>
									{slide.tags.map((tag) => (
										<Badge key={tag} variant='outline'>
											<Typography.Text as='span' size='xs' weight='normal' className='text-inherit'>
												{tag}
											</Typography.Text>
										</Badge>
									))}
								</div>
							) : null}

							{slide.quote ? (
								<Typography.Text
									variant='blockquote'
									size='sm'
									color='muted'
									className='mt-8 border-primary/40'>
									{slide.quote}
								</Typography.Text>
							) : null}
						</div>
					</div>

					{slide.asideCard ? (
						<aside className='flex w-full shrink-0 flex-col rounded-3xl border border-border/60 bg-background/40 p-6 shadow-2xl backdrop-blur-xl md:p-7 lg:max-w-sm'>
							<Typography.Title
								level={5}
								className={cn('text-balance', slide.asideCard.intro ? 'mb-2' : 'mb-4')}>
								{slide.asideCard.title}
							</Typography.Title>
							{slide.asideCard.intro ? (
								<Typography.Text
									size='sm'
									color='muted'
									className='mb-5 text-pretty leading-relaxed'>
									{slide.asideCard.intro}
								</Typography.Text>
							) : null}
							<dl className='flex flex-col gap-5'>
								{slide.asideCard.rows.map((row) => (
									<div key={row.label} className='flex gap-3'>
										{row.icon ? (
											<div
												className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-primary/10 text-primary'
												aria-hidden>
												<DynamicIcon name={row.icon} className='h-4 w-4' />
											</div>
										) : (
											<div className='w-10 shrink-0' aria-hidden />
										)}
										<div className='min-w-0 flex-1'>
											<dt>
												<Typography.Text
													size='xs'
													color='muted'
													className='font-semibold uppercase tracking-wide'>
													{row.label}
												</Typography.Text>
											</dt>
											<dd className='mt-1.5'>
												<Typography.Text size='sm' className='text-pretty leading-relaxed'>
													{row.value}
												</Typography.Text>
											</dd>
										</div>
									</div>
								))}
							</dl>
						</aside>
					) : null}
				</div>
			</Container>
		</section>
	);
}
