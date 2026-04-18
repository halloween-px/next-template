import Image from 'next/image';
import InfoblocksV1 from '@/kit/components/blocks/infoblocks/v1';
import StatsV1 from '@/kit/components/blocks/stats/v1';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import type { TAboutContent } from './type';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { Container } from '@/kit/components/shared/container';
import { Typography } from '@/kit/components/ui/typography';
import { KitCtaTextLink } from '@/kit/components/shared/kit-cta-text-link';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';

const FALLBACK_ABOUT_IMAGE = 'modern-office-collaboration.png';

export const AboutV1 = (
	props: TAboutContent & { sectionTitleVariant?: SectionTitleVariant },
) => {
	const {
		description,
		mission,
		image,
		title,
		links,
		subtitle,
		stats,
		infoblocks,
		sectionTitleVariant = 'default',
		sectionTitleAlign,
		sectionBodyAlign,
		layoutReverse,
	} = props;

	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id={'about'}>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					align={titleAlign}
					descriptionAlign={bodyAlign}
					title={title}
					subtitle={subtitle}
					description={mission}
				/>

				{stats != null && stats.length > 0 ? <StatsV1 items={stats} embedded /> : null}
				{infoblocks != null && infoblocks.length > 0 ? (
					<InfoblocksV1 items={infoblocks} embedded />
				) : null}

				{/* Story Section */}
				<div
					className={
						layoutReverse
							? 'grid items-center gap-12 md:grid-cols-2 md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1'
							: 'grid items-center gap-12 md:grid-cols-2'
					}>
					<div className={bodyAlign === 'center' ? 'text-center' : bodyAlign === 'right' ? 'text-right' : ''}>
						<Typography.Title level={3} align={bodyAlign} className='mb-6'>
							Наша история
						</Typography.Title>
						<div className='space-y-4 leading-relaxed text-muted-foreground'>
							<Typography.Text color='muted' align={bodyAlign}>
								Компания была основана в 2010 году с простой целью — помогать бизнесу использовать
								технологии для достижения своих целей. За годы работы мы выросли из небольшой
								команды энтузиастов в крупное агентство с международным опытом.
							</Typography.Text>
							<Typography.Text color='muted' align={bodyAlign}>
								Сегодня мы специализируемся на разработке веб-приложений, мобильных решений и
								корпоративных систем. Наши клиенты — от стартапов до крупных корпораций, и каждому
								мы предлагаем индивидуальный подход и внимание к деталям.
							</Typography.Text>
							<Typography.Text color='muted' align={bodyAlign}>
								Мы гордимся тем, что наши решения помогают компаниям оптимизировать процессы,
								увеличивать прибыль и создавать лучший опыт для своих пользователей.
							</Typography.Text>
						</div>
						{description ? (
							<Typography.Text color='muted' align={bodyAlign} className='mt-2'>
								{description}
							</Typography.Text>
						) : null}
						{links != null && links.length > 0 ? (
							<div
								className={cn(
									'mt-6 flex flex-wrap gap-4',
									bodyAlign === 'center' && 'justify-center',
									bodyAlign === 'right' && 'justify-end',
								)}>
								{links.map((link) => (
									<KitCtaTextLink
										key={link.href}
										href={link.href}
										label={link.label}
										modal={link.modal}
									/>
								))}
							</div>
						) : null}
					</div>
					<div className='relative'>
						<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-xl' />
						<Image
							width={800}
							height={800}
							src={`/images/about/${image ?? FALLBACK_ABOUT_IMAGE}`}
							alt='Наша команда'
							className='aspect-square h-full w-full rounded-2xl object-cover from-primary/10 to-accent/10'
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default AboutV1;
