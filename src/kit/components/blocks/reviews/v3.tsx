import { Avatar, AvatarFallback, AvatarImage } from '@/kit/components/ui/avatar';
import { Typography } from '@/kit/components/ui/typography';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { cn } from '@/lib/utils';
import type { TReviewsContent } from './types';
import { ReviewsStars } from './ui/reviews-stars';
import type { SectionTextAlign } from '@/types/section-layout';

/**
 * Reviews v3 — полосы по одному отзыву, чередование фона и выравнивания:
 * нечётные ряды слева, чётные справа (на мобиле — по краям с тем же порядком).
 */
export default function ReviewsV3({
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
		<Section id='testimonials' className='overflow-hidden px-0'>
			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					title={title}
					subtitle={subtitle}
					description={description}
					align={titleAlign}
					descriptionAlign={bodyAlign}
				/>
			</Container>

			<div className='mt-12 flex flex-col lg:mt-16'>
				{reviews.map((review, index) => {
					const alignLeft = index % 2 === 0;

					return (
						<div
							key={review.id}
							className={cn(
								'w-full py-12 md:py-16',
								index % 2 === 0 ? 'bg-muted/35' : 'bg-background'
							)}>
							<Container>
								<div
									className={cn(
										'flex w-full max-w-3xl flex-col gap-6 md:max-w-4xl',
										alignLeft ? 'me-auto text-left' : 'ms-auto text-right'
									)}>
									<ReviewsStars
										rating={review.rating}
										size='md'
										className={alignLeft ? 'justify-start' : 'justify-end'}
									/>

									<Typography.Title
										level={4}
										weight='normal'
										align={alignLeft ? 'left' : 'right'}
										className='text-balance text-xl leading-relaxed text-foreground md:text-2xl'>
										«{review.textContent}»
									</Typography.Title>

									<div
										className={cn(
											'mt-2 flex gap-4',
											alignLeft ? 'flex-row' : 'flex-row-reverse justify-items-end'
										)}>
										<Avatar className='size-12 shrink-0 ring-2 ring-primary/30'>
											<AvatarImage src={review.avatar || undefined} alt={review.name} />
											<AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className={cn('min-w-0', alignLeft ? 'text-left' : 'text-right')}>
											<p className='font-semibold text-foreground'>{review.name}</p>
											<p className='text-sm text-muted-foreground'>{review.role}</p>
										</div>
									</div>
								</div>
							</Container>
						</div>
					);
				})}
			</div>
		</Section>
	);
}
