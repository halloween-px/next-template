import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Badge } from '@/kit/components/ui/badge';
import { Card } from '@/kit/components/ui/card';
import { TServicesCard } from '../types';
import { Typography } from '@/kit/components/ui/typography';

type ServiceCardProps = {
	service: TServicesCard;
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
	return (
		<Card className='p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/50 group bg-card/80 backdrop-blur-sm relative overflow-hidden'>
			<div
				className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
			/>

			<div className='flex flex-col h-full relative z-10'>
				<div className='w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg'>
					<DynamicIcon name={service.icon || ''} className='w-7 h-7 text-primary' />
				</div>
				<Typography.Title level={6} weight='semibold'>
					{service.title}
				</Typography.Title>
				{service.description && (
					<Typography.Text color='muted' className='py-4'>
						{service.description}
					</Typography.Text>
				)}

				{service.features && (
					<div className='flex flex-wrap gap-2 pt-4 border-t border-border/50'>
						{service.features?.map((feature, featureIndex) => (
							<Badge key={featureIndex} variant='outline' className='text-xs bg-background/50'>
								{feature}
							</Badge>
						))}
					</div>
				)}
			</div>
		</Card>
	);
};
