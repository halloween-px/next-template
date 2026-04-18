import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import { Container } from '@/kit/components/shared/container';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { ServiceRowCardV2 } from './ui/service-row-card-v2';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import type { TServicesContent } from './types';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';

/**
 * services-v2: липкий блок заголовка слева, вертикальный список карточек услуг справа.
 */
export default function ServicesV2({
	title,
	subtitle,
	description,
	services,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
	layoutReverse,
}: TServicesContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id='services' className='overflow-visible'>
			<SectionBackground variant='dots' />
			<Container>
				<div
					className={cn(
						'grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16',
						layoutReverse && 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1',
					)}>
					<div className='lg:col-span-4'>
						<div className='space-y-8 lg:sticky lg:top-28'>
							<SectionTitle
								variant={sectionTitleVariant}
								title={title}
								align={titleAlign}
								descriptionAlign={bodyAlign}
								isBadge={Boolean(subtitle)}
								subtitle={subtitle}
								description={description}
							/>
							<div
								className={cn(
									titleAlign === 'center' && 'flex justify-center',
									titleAlign === 'right' && 'flex justify-end',
								)}>
								<KitCtaButton
									href='#contacts'
									label='Обсудить проект'
									modal='discussProject'
									size='lg'
									className='w-full shadow-lg transition-shadow hover:shadow-xl sm:w-auto'
								/>
							</div>
						</div>
					</div>

					<div className='space-y-4 lg:col-span-8'>
						{services.map((service, index) => (
							<ServiceRowCardV2 key={`${service.title}-${index}`} service={service} />
						))}
					</div>
				</div>
			</Container>
		</Section>
	);
}
