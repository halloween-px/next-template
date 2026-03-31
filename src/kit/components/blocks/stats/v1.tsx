import { Card } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { Section } from '@/kit/components/shared/sections/section';
import { Container } from '@/kit/components/shared/container';
import type { TStatsContent } from './type';

type StatsV1Props = TStatsContent & {
	/** Внутри about — без обёртки Section */
	embedded?: boolean;
	/** Для отдельной секции на странице */
	sectionId?: string;
};

export default function StatsV1({ items, embedded, sectionId = 'stats' }: StatsV1Props) {
	if (!items?.length) return null;

	const grid = (
		<div className='relative mb-20'>
			<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl' />
			<div className='relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8'>
				<div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
					{items.map((stat, index) => (
						<div key={`${stat.label}-${index}`} className='text-center'>
							<Typography.Title level={2} align='center' color='primary'>
								{stat.value}
							</Typography.Title>
							<Typography.Text align='center' color='muted' className='mt-2 uppercase'>
								{stat.label}
							</Typography.Text>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	if (embedded) {
		return grid;
	}

	return (
		<Section id={sectionId}>
			<Container>{grid}</Container>
		</Section>
	);
}
