'use client';

import Image from 'next/image';
import { Badge } from '@/kit/components/ui/badge';
import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import { Typography } from '@/kit/components/ui/typography';
import { Container } from '@/kit/components/shared/container';
import { LeadShortForm } from '@/kit/components/forms';
import { cn } from '@/lib/utils';
import { useSlider } from '@/kit/hooks/use-slider';
import type { THeroContent } from './type';

export default function HeroV4({ slides, autoplay, interval, leadForm }: THeroContent) {
	const {
		activeIndex,
		setActiveIndex,
		activeSlide: slide,
	} = useSlider({
		slides,
		autoplay,
		interval,
	});

	if (!slides?.length) return null;

	const preset = leadForm?.preset ?? 'lead-short';
	const formCopy = {
		title: leadForm?.title ?? 'Быстрая заявка',
		subtitle: leadForm?.subtitle ?? 'Перезвоним и уточним задачу',
		submitLabel: leadForm?.submitLabel ?? 'Отправить',
	};

	return (
		<section className='relative min-h-[calc(100vh-var(--height-header))] overflow-hidden'>
			{/* Фон: слайды */}
			<div className='absolute inset-0'>
				{slides.map((s, index) => (
					<div
						key={`${s.title}-${index}`}
						className={cn(
							'absolute inset-0 transition-opacity duration-700 ease-out',
							index === activeIndex ? 'z-[1] opacity-100' : 'z-0 opacity-0'
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
						<div className='absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20 lg:via-background/75' />
						<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40' />
					</div>
				))}
			</div>

			<div className='relative z-[2] flex min-h-[calc(100vh-var(--height-header))] flex-col'>
				<Container className='flex flex-1 flex-col pt-10 lg:pt-16'>
					{/* Выше карточки заявки (z-[3]), иначе она перехватывает клики по CTA */}
					<div className='relative z-[4] flex max-w-2xl flex-1 flex-col justify-center pb-8 lg:pb-24'>
						<div className='mb-6 flex gap-2'>
							{slides.map((_, i) => (
								<button
									key={i}
									type='button'
									onClick={() => setActiveIndex(i)}
									className={cn(
										'h-2 rounded-full transition-all',
										i === activeIndex
											? 'w-8 bg-primary'
											: 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/65'
									)}
									aria-label={`Слайд ${i + 1}`}
									aria-current={i === activeIndex ? 'true' : undefined}
								/>
							))}
						</div>

						{slide.eyebrow ? (
							<Badge variant='secondary' className='mb-4 w-fit px-3 py-1'>
								<Typography.Text as='span' size='xs' weight='medium' className='text-inherit'>
									{slide.eyebrow}
								</Typography.Text>
							</Badge>
						) : null}

						<Typography.Title
							level={2}
							as='h1'
							weight='bold'
							className='text-pretty text-3xl sm:text-4xl lg:text-5xl'>
							{slide.title}
						</Typography.Title>
						<Typography.Text
							size='lg'
							color='muted'
							className='mt-4 max-w-xl text-pretty leading-relaxed'>
							{slide.description}
						</Typography.Text>

						<div className='mt-8 flex flex-wrap gap-3'>
							{slide.buttons.map(
								(button, i) => (
									console.log(button),
									(
										<KitCtaButton
											key={`${button.link}-${i}`}
											href={button.link}
											label={button.label}
											modal={button.modal}
											size='lg'
											variant={i === 0 ? 'default' : 'outline'}
										/>
									)
								)
							)}
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
					</div>
				</Container>

				{preset === 'lead-short' ? (
					<div
						className={cn(
							'z-[3] w-full max-w-md shrink-0 px-4 pb-10 lg:absolute lg:bottom-8 lg:right-8 lg:px-0 lg:pb-0',
							'mx-auto lg:mx-0 lg:ml-auto'
						)}>
						<LeadShortForm
							copy={formCopy}
							variant={leadForm?.shell ?? 'card'}
							submitContext={{ source: 'hero-v4' }}
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}
