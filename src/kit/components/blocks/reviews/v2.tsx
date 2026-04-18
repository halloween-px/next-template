import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/kit/components/ui/avatar';
import { Typography } from '@/kit/components/ui/typography';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import type { TReviewsContent } from './types';
import { ReviewsStars } from './ui/reviews-stars';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';
import { flexJustifyFromAlign } from '@/lib/section-align';

/**
 * Reviews v2 — сетка карточек с крупной типографикой и иконкой цитаты:
 * без карусели, акцент на тексте отзыва.
 */
export default function ReviewsV2({
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
		<Section id='testimonials' className='bg-background'>
			<SectionBackground variant='grid' />

			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					title={title}
					subtitle={subtitle}
					description={description}
					align={titleAlign}
					descriptionAlign={bodyAlign}
				/>

				<div className={cn('mt-12 flex w-full lg:mt-16', flexJustifyFromAlign(bodyAlign))}>
					<div className='grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:gap-8'>
					{reviews.map((review) => (
						<div
							key={review.id}
							className='relative flex flex-col rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm ring-1 ring-border/40 lg:p-8'>
							<Quote
								className='pointer-events-none absolute right-6 top-6 size-14 text-primary/15 lg:right-8 lg:top-8'
								strokeWidth={1}
								aria-hidden
							/>

							<div className='relative flex flex-col gap-5'>
								<ReviewsStars rating={review.rating} size='sm' />

								<Typography.Text size='lg' color='muted' variant='blockquote' className='border-primary/35'>
									{review.textContent}
								</Typography.Text>

								<div className='mt-auto flex flex-wrap items-center gap-4 border-t border-border/60 pt-5'>
									<Avatar className='size-11 ring-2 ring-primary/25'>
										<AvatarImage src={review.avatar || undefined} alt={review.name} />
										<AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className='min-w-0 flex-1'>
										<p className='font-semibold leading-tight text-foreground'>{review.name}</p>
										<p className='mt-1 text-sm text-muted-foreground'>{review.role}</p>
									</div>
								</div>
							</div>
						</div>
					))}
					</div>
				</div>
			</Container>
		</Section>
	);
}
