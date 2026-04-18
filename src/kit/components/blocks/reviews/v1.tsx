import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/kit/components/ui/carousel';
import { TReviewsContent } from './types';
import { Container } from '@/kit/components/shared/container';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { ReviewsItem } from './ui/reviews-item';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';
import { marginInlineAutoFromAlign } from '@/lib/section-align';

export default function ReviewsV1({
	description,
	reviews,
	subtitle,
	title,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TReviewsContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<section id='testimonials' className='relative py-24 overflow-hidden'>
			{/* Gradient background */}
			<div className='absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background' />

			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle
						variant={sectionTitleVariant}
						title={title}
						subtitle={subtitle}
						description={description}
						align={titleAlign}
						descriptionAlign={bodyAlign}
					/>

					<Carousel
						opts={{
							align: 'start',
							loop: true,
						}}
						className={cn('w-full max-w-6xl', marginInlineAutoFromAlign(bodyAlign))}>
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
}
