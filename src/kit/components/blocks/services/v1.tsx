import { KitCtaButton } from '@/kit/components/shared/kit-cta-button';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { TServicesContent } from './types';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { ServiceCard } from './ui/service-card';
import { Container } from '@/kit/components/shared/container';
import { Typography } from '@/kit/components/ui/typography';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';

export default function ServicesV1({
	title,
	subtitle,
	description,
	image,
	services,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TServicesContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id='services'>
			<SectionBackground variant='grid' />
			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					align={titleAlign}
					descriptionAlign={bodyAlign}
					title={title}
					subtitle={subtitle}
					description={description}
				/>

				<div className='mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{services.map((service, index) => (
						<ServiceCard service={service} key={index} />
					))}
				</div>

				<div
					className={
						bodyAlign === 'left'
							? 'relative text-left'
							: bodyAlign === 'right'
								? 'relative text-right'
								: 'text-center relative'
					}>
					<div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl blur-2xl' />
					<div
						className={
							bodyAlign === 'center'
								? 'relative mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm'
								: 'relative max-w-2xl rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm'
						}>
						<Typography.Text color='muted' align={bodyAlign} size='lg' className='mb-4'>
							Не нашли нужную услугу? Давайте обсудим ваш проект
						</Typography.Text>
						<div
							className={cn(
								bodyAlign === 'center' && 'flex justify-center',
								bodyAlign === 'right' && 'flex justify-end',
							)}>
							<KitCtaButton
								href='#contacts'
								label='Обсудить проект'
								modal='discussProject'
								size='lg'
								className='shadow-lg transition-shadow hover:shadow-xl'
							/>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
}
