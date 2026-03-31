import Image from 'next/image';
import { ComposeAboutParts, resolveAboutParts } from './compose-about-parts';
import { TAboutContent } from './type';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { Container } from '@/kit/components/shared/container';

const FALLBACK_ABOUT_IMAGE = 'modern-office-collaboration.png';

export const About = (props: TAboutContent) => {
	const { mission, image, subtitle, title } = props;
	const parts = resolveAboutParts(props);

	return (
		<Section id={'about'}>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle title={title} subtitle={subtitle} description={mission} />

				{parts.length > 0 ? <ComposeAboutParts parts={parts} /> : null}

				<div className='grid items-center gap-12 md:grid-cols-2'>
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

export default About;
