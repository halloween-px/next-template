import { Card } from '@/kit/components/ui/card';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Typography } from '@/kit/components/ui/typography';
import { Section } from '@/kit/components/shared/sections/section';
import { Container } from '@/kit/components/shared/container';
import type { TInfoblocksContent } from './type';

type InfoblocksV1Props = TInfoblocksContent & {
	embedded?: boolean;
	sectionId?: string;
};

export default function InfoblocksV1({
	items,
	embedded,
	sectionId = 'infoblocks',
}: InfoblocksV1Props) {
	if (!items?.length) return null;

	const grid = (
		<div className='mb-20 grid gap-6 md:grid-cols-2'>
			{items.map((value, index) => (
				<Card
					key={`${value.title}-${index}`}
					className='group border-border/50 bg-card/80 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'>
					<div className='flex items-start gap-4'>
						<div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 transition-transform group-hover:scale-110'>
							<DynamicIcon name={value.icon} className='h-6 w-6 text-primary' />
						</div>
						<div>
							<Typography.Title level={6} weight='semibold'>
								{value.title}
							</Typography.Title>
							<Typography.Text color='muted'>{value.description}</Typography.Text>
						</div>
					</div>
				</Card>
			))}
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
