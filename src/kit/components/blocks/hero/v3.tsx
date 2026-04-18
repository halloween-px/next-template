'use client';

import Image from 'next/image';
import { Badge } from '@/kit/components/ui/badge';
import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';
import { useSlider } from '@/kit/hooks/use-slider';
import type { THeroContent } from './type';

/**
 * Hero v3 — сплит-экран: слева текст и точки слайдов, справа полноэкранное фото с кроссфейдом.
 * На мобиле сверху изображение, под ним контент.
 */
export default function HeroV3({ slides, autoplay, interval }: THeroContent) {
	const { activeIndex, setActiveIndex, activeSlide: slide } = useSlider({
		slides,
		autoplay,
		interval,
	});

	if (!slides?.length) return null;

	return (
		<section className='grid min-h-[calc(100vh-var(--height-header))] grid-cols-1 lg:grid-cols-2'>
			<div className='order-2 flex flex-col justify-center border-border/60 bg-muted/10 px-6 py-12 lg:order-1 lg:border-r lg:px-10 xl:px-14'>
				<div className='mx-auto flex w-full max-w-xl flex-col'>
					<div className='mb-8 flex gap-2'>
						{slides.map((_, i) => (
							<button
								key={i}
								type='button'
								onClick={() => setActiveIndex(i)}
								className={cn(
									'h-2.5 rounded-full transition-all',
									i === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/60',
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

					<Typography.Title level={3} as='h1' weight='bold' className='text-pretty'>
						{slide.title}
					</Typography.Title>
					<Typography.Text size='lg' color='muted' className='mt-4 text-pretty leading-relaxed'>
						{slide.description}
					</Typography.Text>

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
				</div>
			</div>

			<div className='relative order-1 min-h-[min(50vh,28rem)] lg:order-2 lg:min-h-0'>
				{slides.map((s, index) => (
					<div
						key={`${s.title}-${index}`}
						className={cn(
							'absolute inset-0 transition-opacity duration-700 ease-out',
							index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0',
						)}
						aria-hidden={index !== activeIndex}>
						<Image
							width={1600}
							height={1200}
							priority={index === 0}
							src={s.backgroundImage || '/placeholder.svg'}
							alt={s.title}
							className='h-full w-full object-cover'
						/>
						<div
							className='absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent lg:bg-gradient-to-l lg:from-background/20 lg:via-transparent lg:to-transparent'
							aria-hidden
						/>
					</div>
				))}
			</div>
		</section>
	);
}
