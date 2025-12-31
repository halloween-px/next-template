'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { TReviewsContent } from './types';
import { Container } from '@/components/shared/сontainer';
import { SectionTitle } from '@/components/shared/sections/section-title';

const Reviews = ({ description, reviews, subtitle, title }: TReviewsContent) => {
	return (
		<section id='testimonials' className='relative py-24 overflow-hidden'>
			{/* Gradient background */}
			<div className='absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background' />

			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle title={title} subtitle={subtitle} description={description} />

					<Carousel
						opts={{
							align: 'start',
							loop: true,
						}}
						className='w-full max-w-6xl mx-auto'>
						<CarouselContent>
							{reviews.map((testimonial) => (
								<CarouselItem key={testimonial.id} className='md:basis-1/2 lg:basis-1/2'>
									<Card className='h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur'>
										<CardContent className='p-8'>
											<div className='flex gap-1 mb-4'>
												{Array.from({ length: testimonial.rating }).map((_, i) => (
													<Star key={i} className='h-5 w-5 fill-primary text-primary' />
												))}
											</div>
											<p className='text-lg leading-relaxed mb-6 text-foreground'>
												{testimonial.textContent}
											</p>
											<div className='flex items-center gap-4'>
												<Avatar className='h-12 w-12 ring-2 ring-primary/20'>
													<AvatarImage
														src={testimonial.avatar || '/placeholder.svg'}
														alt={testimonial.name}
													/>
													<AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
												</Avatar>
												<div>
													<p className='font-semibold'>{testimonial.name}</p>
													<p className='text-sm text-muted-foreground'>{testimonial.role}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className='hidden md:flex' />
						<CarouselNext className='hidden md:flex' />
					</Carousel>
				</div>
			</Container>
		</section>
	);
};

export default Reviews;
