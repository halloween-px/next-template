import Image from 'next/image';
import { Badge } from '@/kit/components/ui/badge';
import { Typography } from '@/kit/components/ui/typography';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { cn } from '@/lib/utils';
import type { TTeamsContent } from './types';
import { TeamSocialIconRow } from './ui/team-social-icon-row';
import type { SectionTextAlign } from '@/types/section-layout';

const IMG_BASE = '/images/team';

/**
 * Teams v2 — журнальная сетка: крупные портреты и текст чередуются слева/справа,
 * без «витринных» карточек v1.
 */
export default function TeamV2({
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
		<Section id='team' className='bg-background'>
			<SectionBackground variant='gradient-muted' />

			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					title={title}
					subtitle={subtitle}
					description={description}
					align={titleAlign}
					descriptionAlign={bodyAlign}
				/>

				<div className='mt-12 flex flex-col gap-14 md:mt-16 md:gap-20 lg:gap-24'>
					{teams.map((member, index) => {
						const isReversed = index % 2 === 1;
						return (
							<article
								key={member.id}
								className={cn(
									'grid gap-8 md:items-start md:gap-10 lg:gap-14',
									// фото — фиксированная «хорошая» ширина; текст — всё оставшееся пространство контейнера
									!isReversed && 'md:grid-cols-[minmax(280px,420px)_1fr]',
									isReversed && 'md:grid-cols-[1fr_minmax(280px,420px)]',
								)}>
								<div
									className={cn(
										'relative aspect-4/5 w-full overflow-hidden rounded-4xl border border-border/60 bg-muted/30 shadow-md ring-1 ring-border/40',
										isReversed && 'md:order-2',
									)}>
									<Image
										src={member.image ? `${IMG_BASE}/${member.image}` : '/placeholder.svg'}
										alt={member.name}
										fill
										className='object-cover'
										sizes='(max-width: 768px) 90vw, 420px'
										priority={index < 2}
									/>
								</div>

								<div
									className={cn(
										'flex min-w-0 flex-col gap-4 md:py-1 lg:gap-5',
										isReversed && 'md:order-1',
									)}>
									<Badge variant='secondary' className='w-fit font-medium'>
										{member.role}
									</Badge>
									<Typography.Title level={3} as='h3'>
										{member.name}
									</Typography.Title>
									<Typography.Text
										color='muted'
										size='lg'
										variant='blockquote'
										className='border-primary/40'>
										{member.bio}
									</Typography.Text>
									{member.bioDetail ? (
										<Typography.Text color='muted' size='base' className='mt-1 max-w-none'>
											{member.bioDetail}
										</Typography.Text>
									) : null}
									{member.focusAreas?.length ? (
										<div className='mt-2 border-t border-border/60 pt-4'>
											<p className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
												Фокус и компетенции
											</p>
											<ul className='space-y-2 text-sm leading-relaxed text-muted-foreground'>
												{member.focusAreas.map((line, i) => (
													<li key={`${member.id}-focus-${i}`} className='flex gap-2'>
														<span className='mt-2 size-1.5 shrink-0 rounded-full bg-primary/70' aria-hidden />
														<span>{line}</span>
													</li>
												))}
											</ul>
										</div>
									) : null}
									<TeamSocialIconRow social={member.social} className='pt-2' />
								</div>
							</article>
						);
					})}
				</div>
			</Container>
		</Section>
	);
}
