import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { TReviewsContent } from './types';
import { Container } from '@/components/shared/сontainer';
import { SectionTitle } from '@/components/shared/sections/section-title';
import { ReviewsItem } from './ui/reviews-item';

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
								<CarouselItem key={testimonial.id}>
									<ReviewsItem {...testimonial} />
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
