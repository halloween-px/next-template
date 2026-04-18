import { Badge } from '@/kit/components/ui/badge';
import { Typography } from '@/kit/components/ui/typography';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { cn } from '@/lib/utils';
import type { TServicesCard } from '../types';

/** Одна карточка в списке для блока services-v2 (липкий заголовок + колонка карточек). */
export function ServiceRowCardV2({ service }: { service: TServicesCard }) {
	return (
		<article
			className={cn(
				'group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm backdrop-blur-sm transition-all',
				'hover:border-primary/40 hover:shadow-md',
			)}>
			{service.gradient ? (
				<div
					className={cn(
						'pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100',
						'bg-gradient-to-br',
						service.gradient,
					)}
					aria-hidden
				/>
			) : null}
			<div className='relative flex flex-col gap-4 sm:flex-row sm:gap-6'>
				<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20'>
					<DynamicIcon name={service.icon || ''} className='h-7 w-7' />
				</div>
				<div className='min-w-0 flex-1 space-y-3'>
					<Typography.Title level={5} as='h3' weight='semibold'>
						{service.title}
					</Typography.Title>
					{service.description ? (
						<Typography.Text color='muted' className='text-pretty leading-relaxed'>
							{service.description}
						</Typography.Text>
					) : null}
					{service.features && service.features.length > 0 ? (
						<div className='flex flex-wrap gap-2 pt-1'>
							{service.features.map((feature, i) => (
								<Badge key={i} variant='secondary' className='text-xs font-normal'>
									{feature}
								</Badge>
							))}
						</div>
					) : null}
				</div>
			</div>
		</article>
	);
}
