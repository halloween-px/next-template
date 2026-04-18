import Image from 'next/image';
import { Card, CardContent } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import type { TTeamsContent } from './types';
import { TeamSocialIconRow } from './ui/team-social-icon-row';
import type { SectionTextAlign } from '@/types/section-layout';

const IMG_BASE = '/images/team';

/**
 * Teams v3 — компактная «визитница»: круглые аватары, сетка 2×2, короткий текст в одной линии с фото.
 */
export default function TeamV3({
	description,
	subtitle,
	teams,
	title,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TTeamsContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id='team' className='bg-muted/20'>
			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					title={title}
					subtitle={subtitle}
					description={description}
					align={titleAlign}
					descriptionAlign={bodyAlign}
				/>

				<div className='grid gap-4 sm:grid-cols-2'>
					{teams.map((member) => (
						<Card
							key={member.id}
							className='border-border/60 bg-background/80 shadow-none ring-1 ring-border/50 transition-shadow hover:shadow-md'>
							<CardContent className='flex gap-4 p-5 sm:p-6'>
								<div className='relative size-18 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/30'>
									<Image
										src={member.image ? `${IMG_BASE}/${member.image}` : '/placeholder.svg'}
										alt={member.name}
										fill
										className='object-cover'
										sizes='72px'
									/>
								</div>
								<div className='min-w-0 flex-1'>
									<Typography.Title level={4} as='h3' className='text-lg'>
										{member.name}
									</Typography.Title>
									<Typography.Text color='primary' size='sm' weight='medium' className='mt-0.5'>
										{member.role}
									</Typography.Text>
									<Typography.Text color='muted' size='sm' className='mt-2 line-clamp-3'>
										{member.bio}
									</Typography.Text>
									<TeamSocialIconRow social={member.social} variant='compact' className='mt-3' />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
}
