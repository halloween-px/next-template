import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TServicesContent } from './types';
import { SectionTitle } from '@/components/shared/sections/section-title';
import { Section } from '@/components/shared/sections/section';
import { SectionBackground } from '@/components/shared/sections/section-background';
import { ServiceCard } from './ui/service-card';
import { Container } from '@/components/shared/container';
import { Typography } from '@/components/ui/typography';

export default function ServicesV1({
	title,
	subtitle,
	description,
	image,
	services,
}: TServicesContent) {
	return (
		<Section id='services'>
			<SectionBackground variant='grid' />
			<Container>
				<SectionTitle title={title} subtitle={subtitle} description={description} />

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					{services.map((service, index) => (
						<ServiceCard service={service} key={index} />
					))}
				</div>

				<div className='text-center relative'>
					<div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl blur-2xl' />
					<div className='relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-2xl mx-auto'>
						<Typography.Text color='muted' align='center' size='lg' className='mb-4'>
							Не нашли нужную услугу? Давайте обсудим ваш проект
						</Typography.Text>
						<Button size='lg' asChild className='shadow-lg hover:shadow-xl transition-shadow'>
							<Link href='#contact'>Обсудить проект</Link>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
}
