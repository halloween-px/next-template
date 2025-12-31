import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { TServicesContent } from './types';
import { DynamicIcon } from '@/components/shared/dynamic-icon';
import { SectionTitle } from '@/components/shared/sections/section-title';

export default function Services({
	title,
	subtitle,
	description,
	image,
	services,
}: TServicesContent) {
	return (
		<section className='py-section bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden'>
			<div className='absolute inset-0 opacity-20'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
						backgroundSize: '40px 40px',
					}}
				/>
			</div>

			<div className='absolute top-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl' />
			<div className='absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl' />

			<div className='container mx-auto px-4 relative'>
				<SectionTitle title={title} subtitle={subtitle} description={description} />

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
					{services.map((service, index) => (
						<Card
							key={index}
							className='p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50 group bg-card/80 backdrop-blur-sm relative overflow-hidden'>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>

							<div className='flex flex-col h-full relative z-10'>
								<div className='w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg'>
									<DynamicIcon name={service.icon || ''} className='w-7 h-7 text-primary' />
								</div>
								<h3 className='text-xl font-semibold mb-3'>{service.title}</h3>
								<p className='text-muted-foreground leading-relaxed mb-4 flex-grow'>
									{service.description}
								</p>
								<div className='flex flex-wrap gap-2 pt-4 border-t border-border/50'>
									{service.features?.map((feature, featureIndex) => (
										<Badge
											key={featureIndex}
											variant='outline'
											className='text-xs bg-background/50'>
											{feature}
										</Badge>
									))}
								</div>
							</div>
						</Card>
					))}
				</div>

				<div className='text-center relative'>
					<div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-2xl blur-2xl' />
					<div className='relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 max-w-2xl mx-auto'>
						<p className='text-muted-foreground mb-6 text-lg'>
							Не нашли нужную услугу? Давайте обсудим ваш проект
						</p>
						<Button size='lg' asChild className='shadow-lg hover:shadow-xl transition-shadow'>
							<Link href='#contact'>Обсудить проект</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
