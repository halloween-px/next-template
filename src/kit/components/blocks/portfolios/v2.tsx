'use client';

import { Button } from '@/kit/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/kit/components/ui/dialog';
import { Typography } from '@/kit/components/ui/typography';
import { ExternalLink, Github, Images } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

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

function projectThumbList(project: TPortfoliosContent['projects'][0]): string[] {
	const g = project.gallery?.filter(Boolean);
	if (g && g.length > 0) return g;
	return project.image ? [project.image] : [];
}

const IMG_BASE = '/images/portfolios';

/**
 * portfolios-v2 — две карточки в ряд: главное фото, короткий текст,
 * полоска из 5 миниатюр и 6-й слот «Показать ещё», если снимков больше пяти.
 */
export default function PortfolioV2({
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
	const [galleryMoreId, setGalleryMoreId] = useState<string | null>(null);

	const filteredProjects =
		activeCategory === 'Все'
			? projects
			: projects.filter((project) => project.category === activeCategory);

	const moreProject = useMemo(
		() => filteredProjects.find((p) => p.id === galleryMoreId) ?? null,
		[filteredProjects, galleryMoreId],
	);

	const extraGalleryImages = useMemo(() => {
		if (!moreProject) return [];
		const thumbs = projectThumbList(moreProject);
		return thumbs.slice(5);
	}, [moreProject]);

	return (
		<Section id='portfolio'>
			<SectionBackground variant='grid' />
			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle
						variant={sectionTitleVariant}
						title={title}
						subtitle={subtitle}
						description={description}
						align={titleAlign}
						descriptionAlign={bodyAlign}
					/>

					<div className={cn('mb-10 flex flex-wrap gap-2', flexJustifyFromAlign(bodyAlign))}>
						{categories.map((category) => (
							<button
								key={category}
								type='button'
								onClick={() => setActiveCategory(category)}
								className={cn(
									'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
									activeCategory === category
										? 'border-primary bg-primary text-primary-foreground shadow-sm'
										: 'border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground',
								)}>
								{category}
							</button>
						))}
					</div>

					<div className='flex justify-center'>
						{filteredProjects.length === 0 && <EmptyBlock title='Проекты не найдены' />}
					</div>

					<div className='grid gap-8 md:grid-cols-2'>
						{filteredProjects.map((project) => {
							const thumbs = projectThumbList(project);
							const firstFive = thumbs.slice(0, 5);
							const extraCount = Math.max(0, thumbs.length - 5);
							const paddedFive = [...firstFive];
							while (paddedFive.length < 5) paddedFive.push('');
							const showMoreSlot = extraCount > 0;

							return (
								<article
									key={project.id}
									className={cn(
										'flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm',
										'transition-shadow duration-300 hover:border-primary/30 hover:shadow-lg',
									)}>
									<div className='relative aspect-video w-full shrink-0 overflow-hidden bg-muted'>
										<Image
											src={
												project.image ? `${IMG_BASE}/${project.image}` : '/placeholder.svg'
											}
											alt={project.title}
											fill
											className='object-cover'
											sizes='(max-width: 768px) 100vw, 50vw'
										/>
									</div>

									<div className='flex flex-1 flex-col gap-3 p-4 pt-4'>
										<Typography.Title level={5} as='h3' className='text-balance leading-snug'>
											{project.title}
										</Typography.Title>
										<p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
											{project.description}
										</p>

										<div
											className={cn(
												'grid gap-1.5 sm:gap-2',
												showMoreSlot ? 'grid-cols-6' : 'grid-cols-5',
											)}>
											{paddedFive.map((file, idx) => (
												<div
													key={`${project.id}-t-${idx}`}
													className={cn(
														'relative aspect-square overflow-hidden rounded-lg',
														file ? 'bg-muted ring-1 ring-border/40' : 'bg-muted/40',
													)}>
													{file ? (
														<Image
															src={`${IMG_BASE}/${file}`}
															alt=''
															aria-hidden
															fill
															className='object-cover'
															sizes='80px'
														/>
													) : null}
												</div>
											))}

											{showMoreSlot ? (
												<div className='relative aspect-square'>
													<button
														type='button'
														onClick={() => setGalleryMoreId(project.id)}
														className={cn(
															'flex size-full flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-center',
															'bg-primary/12 text-primary ring-1 ring-primary/35 transition-colors',
															'hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
														)}>
														<Images className='size-4 shrink-0 opacity-90' aria-hidden />
														<span className='text-[10px] font-semibold leading-tight'>
															Показать ещё
														</span>
														<span className='text-[10px] font-medium tabular-nums opacity-90'>
															+{extraCount}
														</span>
													</button>
												</div>
											) : null}
										</div>

										<div className='mt-auto flex flex-wrap gap-2 border-t border-border/40 pt-3'>
											<Button size='sm' className='gap-1.5' variant='secondary' asChild>
												<a href={project.link} target='_blank' rel='noopener noreferrer'>
													<ExternalLink className='size-3.5' aria-hidden />
													Сайт
												</a>
											</Button>
											<Button size='sm' variant='outline' className='gap-1.5' asChild>
												<a href={project.github} target='_blank' rel='noopener noreferrer'>
													<Github className='size-3.5' aria-hidden />
													Код
												</a>
											</Button>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</Container>

			<Dialog open={galleryMoreId !== null} onOpenChange={(open) => !open && setGalleryMoreId(null)}>
				<DialogContent className='sm:max-w-2xl' showCloseButton>
					{moreProject ? (
						<>
							<DialogHeader>
								<DialogTitle>{moreProject.title}</DialogTitle>
								<DialogDescription>Дополнительные кадры проекта</DialogDescription>
							</DialogHeader>
							<div className='grid max-h-[min(60vh,28rem)] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3'>
								{extraGalleryImages.map((file, i) => (
									<div
										key={`${moreProject.id}-extra-${i}`}
										className='relative aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-border/40'>
										<Image
											src={`${IMG_BASE}/${file}`}
											alt=''
											aria-hidden
											fill
											className='object-cover'
											sizes='200px'
										/>
									</div>
								))}
							</div>
						</>
					) : null}
				</DialogContent>
			</Dialog>
		</Section>
	);
}
