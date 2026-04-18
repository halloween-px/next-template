import Image from 'next/image';
import { CircleDot } from 'lucide-react';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import type { TAboutContent } from './type';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Typography } from '@/kit/components/ui/typography';
import { KitCtaTextLink } from '@/kit/components/shared/kit-cta-text-link';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';

const FALLBACK_ABOUT_IMAGE = 'modern-office-collaboration.png';

/**
 * About v2 — отдельный визуал: без встраиваемых блоков stats/infoblocks,
 * акцент на тексте, фактах в одну линию и карточках highlights.
 */
export const About = (props: TAboutContent & { sectionTitleVariant?: SectionTitleVariant }) => {
	const {
		mission,
		image,
		subtitle,
		title,
		description,
		facts,
		highlights,
		links,
		sectionTitleVariant = 'default',
		sectionTitleAlign,
		sectionBodyAlign,
		layoutReverse,
	} = props;

	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id='about' className='overflow-hidden'>
			<SectionBackground variant='grid' />
			<Container>
				<div
					className={cn(
						'grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16',
						layoutReverse && 'lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1',
					)}>
					<div className='relative lg:col-span-5'>
						<div
							aria-hidden
							className='pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/20 blur-2xl'
						/>
						<div className='relative overflow-hidden rounded-3xl border border-border/60 bg-muted/20 shadow-2xl ring-1 ring-white/5'>
							<Image
								width={900}
								height={1100}
								src={`/images/about/${image ?? FALLBACK_ABOUT_IMAGE}`}
								alt={title}
								className='aspect-[4/5] w-full object-cover'
								priority={false}
							/>
						</div>
					</div>

					<div className='flex flex-col gap-8 lg:col-span-7'>
						<SectionTitle
							variant={sectionTitleVariant}
							align={titleAlign}
							isBadge={Boolean(subtitle)}
							title={subtitle ?? ''}
							subtitle={title}
							className='mb-0 max-w-none'
						/>

						{facts != null && facts.length > 0 ? (
							<div
								className={cn(
									'flex flex-wrap gap-x-10 gap-y-4 border-y border-border/70 py-6',
									bodyAlign === 'center' && 'justify-center',
									bodyAlign === 'right' && 'justify-end',
								)}>
								{facts.map((f) => (
									<div key={`${f.label}-${f.value}`} className='min-w-[7rem]'>
										<p className='text-2xl font-semibold tabular-nums text-foreground'>{f.value}</p>
										<p className='text-sm text-muted-foreground'>{f.label}</p>
									</div>
								))}
							</div>
						) : null}

						{mission ? (
							<Typography.Text variant='blockquote' size='lg' align={bodyAlign}>
								{mission}
							</Typography.Text>
						) : null}

						<div className='space-y-4'>
							{description.split('\n').map((para, i) =>
								para.trim() ? (
									<Typography.Text key={i} color='muted' align={bodyAlign} className='leading-relaxed'>
										{para.trim()}
									</Typography.Text>
								) : null
							)}
						</div>

						{links != null && links.length > 0 ? (
							<div
								className={cn(
									'flex flex-wrap gap-4',
									bodyAlign === 'center' && 'justify-center',
									bodyAlign === 'right' && 'justify-end',
								)}>
								{links.map((link) => (
									<KitCtaTextLink
										key={link.href}
										href={link.href}
										label={link.label}
										modal={link.modal}
										className='font-medium'
									/>
								))}
							</div>
						) : null}
					</div>
				</div>

				{highlights != null && highlights.length > 0 ? (
					<div className='mt-12 border-t border-border/60 pt-10'>
						<div className='flex flex-col gap-8 md:flex-row md:flex-nowrap md:gap-0 md:divide-x md:divide-border/50'>
							{highlights.map((h, index) => (
								<div key={`${h.title}-${index}`} className='group min-w-0 flex-1 md:px-5'>
									<div className='mb-2 flex items-center gap-2'>
										<CircleDot className='h-4 w-4 shrink-0 text-primary' aria-hidden />
										<Typography.Title level={5} className='text-sm md:text-base'>
											{h.title}
										</Typography.Title>
									</div>
									<Typography.Text color='muted' size='sm' className='leading-relaxed'>
										{h.description}
									</Typography.Text>
								</div>
							))}
						</div>
					</div>
				) : null}
			</Container>
		</Section>
	);
};

export default About;
