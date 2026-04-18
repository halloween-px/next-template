'use client';

import { Badge } from '@/kit/components/ui/badge';
import { Button } from '@/kit/components/ui/button';
import { Typography } from '@/kit/components/ui/typography';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { EmptyBlock } from '@/kit/components/shared/empty/empty-block';
import { Container } from '@/kit/components/shared/container';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { cn } from '@/lib/utils';
import type { SectionTextAlign } from '@/types/section-layout';
import { flexJustifyFromAlign } from '@/lib/section-align';

import type { TPortfoliosContent } from './types';

/** Срез превью снизу — «ломаная» нижняя грань у картинки */
const IMAGE_CLIP =
	'[clip-path:polygon(0_0,100%_0,100%_min(92%,calc(100%-2.5rem)),calc(100%-3rem)_100%,0_100%)]';

/**
 * portfolios-v3 — крупная двухколоночная сетка:
 * градиентная рамка, диагональный срез у медиа, стеклянная нижняя зона,
 * акцентный номер кейса и лёгкий подъём при hover.
 */
export default function PortfolioV3({
	categories,
	description,
	projects,
	subtitle,
	title,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TPortfoliosContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	const [activeCategory, setActiveCategory] = useState('Все');

	const filteredProjects =
		activeCategory === 'Все'
			? projects
			: projects.filter((project) => project.category === activeCategory);

	return (
		<Section id='portfolio' className='relative overflow-hidden'>
			<SectionBackground variant='clean' />
			<div
				className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]'
				aria-hidden
			/>
			<Container className='relative z-1'>
				<div className='container px-4 md:px-6'>
					<SectionTitle
						variant={sectionTitleVariant}
						title={title}
						subtitle={subtitle}
						description={description}
						align={titleAlign}
						descriptionAlign={bodyAlign}
					/>

					<div className={cn('mb-12 flex flex-wrap gap-2', flexJustifyFromAlign(bodyAlign))}>
						{categories.map((category) => (
							<button
								key={category}
								type='button'
								onClick={() => setActiveCategory(category)}
								className={cn(
									'relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
									activeCategory === category
										? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
										: 'bg-muted/40 text-muted-foreground ring-1 ring-border/60 hover:bg-muted/70 hover:text-foreground',
								)}>
								{category}
							</button>
						))}
					</div>

					<div className='flex justify-center'>
						{filteredProjects.length === 0 && <EmptyBlock title='Проекты не найдены' />}
					</div>

					<div className='grid gap-10 lg:grid-cols-2'>
						{filteredProjects.map((project, index) => (
							<div
								key={project.id}
								className={cn(
									'group relative rounded-4xl p-px',
									'bg-linear-to-br from-primary/45 via-border/80 to-accent/35',
									'shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow duration-500',
									'hover:shadow-2xl hover:shadow-primary/25',
								)}>
								<div className='relative overflow-hidden rounded-[calc(2rem-1px)] bg-card'>
									<span
										className='pointer-events-none absolute -right-2 -top-6 font-mono text-[7rem] font-bold leading-none text-muted/15 transition-opacity duration-500 group-hover:text-primary/10'
										aria-hidden>
										{String(index + 1).padStart(2, '0')}
									</span>

									<div className={cn('relative h-[min(52vw,22rem)] max-h-80 md:h-72', IMAGE_CLIP)}>
										<Image
											src={
												project.image ? `/images/portfolios/${project.image}` : '/placeholder.svg'
											}
											alt={project.title}
											fill
											className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]'
										/>
										<div className='absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-90' />
										<Badge
											className='absolute left-5 top-5 rotate-[-8deg] border-0 bg-background/90 px-3 py-1 text-xs font-semibold shadow-md backdrop-blur-sm'>
											{project.category}
										</Badge>
										<div className='absolute bottom-6 left-5 right-5'>
											<Typography.Title
												level={3}
												as='h3'
												className='text-balance text-2xl font-bold tracking-tight text-foreground drop-shadow-sm md:text-3xl'>
												{project.title}
											</Typography.Title>
										</div>
									</div>

									<div className='relative border-t border-border/50 bg-background/80 px-6 py-6 backdrop-blur-xl'>
										<p className='mb-5 text-pretty text-sm leading-relaxed text-muted-foreground md:text-[15px]'>
											{project.description}
										</p>
										<div className='mb-6 flex flex-wrap gap-2'>
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className='rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border/50'>
													{tech}
												</span>
											))}
										</div>
										<div className='flex flex-wrap items-center gap-3'>
											<Button size='sm' className='gap-2 rounded-full px-5 shadow-sm' asChild>
												<a href={project.link} target='_blank' rel='noopener noreferrer'>
													<ExternalLink className='size-4' aria-hidden />
													Открыть проект
													<ArrowUpRight className='size-4 opacity-70' aria-hidden />
												</a>
											</Button>
											<Button size='sm' variant='outline' className='gap-2 rounded-full' asChild>
												<a href={project.github} target='_blank' rel='noopener noreferrer'>
													<Github className='size-4' aria-hidden />
													Репозиторий
												</a>
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</Section>
	);
}
