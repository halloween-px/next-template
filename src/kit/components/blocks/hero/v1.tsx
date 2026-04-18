'use client';

import { useState, useEffect } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/kit/components/ui/carousel';
import { cn } from '@/lib/utils';
import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import { Container } from '@/kit/components/shared/container';
import Image from 'next/image';
import { THeroContent } from './type';
import { getContentPositionX, getContentPositionY } from './utils/utils';

export default function HeroV1({ slides }: THeroContent) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	const goToSlide = (index: number) => {
		api?.scrollTo(index);
	};

	useEffect(() => {
		if (!api) return;

		setCurrent(api.selectedScrollSnap());

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<Carousel
			setApi={setApi}
			opts={{
				loop: true,
			}}
			className='relative w-full'>
			<CarouselContent>
				{slides?.map((slide, index) => (
					<CarouselItem key={index} slidesCount={1}>
						<div className='relative h-[calc(100vh-var(--height-header))] w-full'>
							{/* Background Image with Overlay */}
							<div className='absolute inset-0'>
								<Image
									width={1900}
									height={1024}
									loading='eager'
									src={slide.backgroundImage || '/placeholder.svg'}
									alt={slide.title}
									className='h-full w-full object-cover'
								/>
								<div className='absolute inset-0 bg-background/60' />
							</div>

							{/* Content */}
							<Container className='h-full'>
								<div
									className={cn(
										'relative z-10 flex h-full w-full py-6 md:py-12 lg:py-24',
										getContentPositionX(slide.contentPosition.x),
										getContentPositionY(slide.contentPosition.y)
									)}>
									<div className={cn('flex max-w-3xl flex-col justify-center gap-6')}>
										<h1 className='text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
											{slide.title}
										</h1>
										<p className='text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl'>
											{slide.description}
										</p>
										<div className={cn('flex gap-2', getContentPositionX(slide.contentPosition.x))}>
											{slide.buttons.map((button, index) => (
												<KitCtaButton
													key={`${button.link}-${index}`}
													href={button.link}
													label={button.label}
													modal={button.modal}
													size='lg'
													variant={index === 0 ? 'default' : 'outline'}
												/>
											))}
										</div>
									</div>
								</div>
							</Container>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>

			<CarouselPrevious className='left-4 h-12 w-12 border-none bg-background/20 text-foreground backdrop-blur-sm hover:bg-background/40 md:left-8' />
			<CarouselNext className='right-4 h-12 w-12 border-none bg-background/20 text-foreground backdrop-blur-sm hover:bg-background/40 md:right-8' />

			<div className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2'>
				{slides?.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={cn(
							'h-2 rounded-full transition-all',
							current === index
								? 'w-8 bg-primary'
								: 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
						)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</Carousel>
	);
}
