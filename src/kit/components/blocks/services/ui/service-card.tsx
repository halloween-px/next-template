import {
	cardHoverGradientOverlayVariants,
	cardHoverIconWrapVariants,
	cardHoverRootVariants,
	type CardHoverPreset,
} from '@/kit/components/shared/interactive-card/card-hover-variants';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Badge } from '@/kit/components/ui/badge';
import { Card } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';
import { TServicesCard } from '../types';

type ServiceCardProps = {
	service: TServicesCard;
	/** Переопределяет `service.cardHover` (например превью вариантов в редакторе). */
	hoverPreset?: CardHoverPreset;
};

export const ServiceCard = ({ service, hoverPreset }: ServiceCardProps) => {
	const preset = hoverPreset ?? service.cardHover ?? 'lift';

	return (
		<Card className={cn(cardHoverRootVariants({ preset }))}>
			{service.gradient && (
				<div className={cn(cardHoverGradientOverlayVariants({ preset }), service.gradient)} />
			)}

			<div className='flex flex-col h-full relative z-10'>
				<div className={cn(cardHoverIconWrapVariants({ preset }))}>
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
