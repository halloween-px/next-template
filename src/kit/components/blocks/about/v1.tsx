import Image from 'next/image';
import { ComposeAboutParts, resolveAboutParts } from './compose-about-parts';
import { TAboutContent } from './type';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { Container } from '@/kit/components/shared/container';
import { Typography } from '@/kit/components/ui/typography';
import { Link } from '@/kit/components/ui/link';

const FALLBACK_ABOUT_IMAGE = 'modern-office-collaboration.png';

export const AboutV1 = (props: TAboutContent) => {
	const { description, mission, image, title, links, subtitle } = props;

	const parts = resolveAboutParts(props);

	return (
		<Section id={'about'}>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle title={title} subtitle={subtitle} description={mission} />

				{parts.length > 0 ? <ComposeAboutParts parts={parts} /> : null}

				{/* Story Section */}
				<div className='grid items-center gap-12 md:grid-cols-2'>
					<div>
						<Typography.Title level={3}>Наша история</Typography.Title>
						<h3 className='mb-6 text-3xl font-bold'></h3>
						<div className='space-y-4 leading-relaxed text-muted-foreground'>
							<Typography.Text color='muted'>
								Компания была основана в 2010 году с простой целью — помогать бизнесу использовать
								технологии для достижения своих целей. За годы работы мы выросли из небольшой
								команды энтузиастов в крупное агентство с международным опытом.
							</Typography.Text>
							<Typography.Text color='muted'>
								Сегодня мы специализируемся на разработке веб-приложений, мобильных решений и
								корпоративных систем. Наши клиенты — от стартапов до крупных корпораций, и каждому
								мы предлагаем индивидуальный подход и внимание к деталям.
							</Typography.Text>
							<Typography.Text color='muted'>
								Мы гордимся тем, что наши решения помогают компаниям оптимизировать процессы,
								увеличивать прибыль и создавать лучший опыт для своих пользователей.
							</Typography.Text>
						</div>
						{description ? (
							<Typography.Text color='muted' className='mt-2'>
								{description}
							</Typography.Text>
						) : null}
						{links?.map((link) => (
							<Link className='mt-6' href={link.href} key={link.href}>
								Подробнее
							</Link>
						))}
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
