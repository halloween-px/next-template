import Image from 'next/image';
import { TAboutContent } from './type';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import { Container } from '@/kit/components/shared/container';
import { Typography } from '@/kit/components/ui/typography';

export const About = ({
	description,
	mission,
	stats,
	infoblocks,
	image,
	title,
	subtitle,
}: TAboutContent) => {
	return (
		<Section id={'about'}>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle title={'ВЕРСИЯ 2'} subtitle={subtitle} description={mission} />

				<div className='relative mb-20'>
					<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl' />
					<div className='relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
							{stats?.map((stat, index) => (
								<div key={index} className='text-center'>
									<Typography.Title level={2} align='center' color='primary'>
										{stat.value}
									</Typography.Title>
									<Typography.Text align='center' color='muted' className='uppercase mt-2'>
										{stat.label}
									</Typography.Text>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Story Section */}
				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div className='relative'>
						<div className='absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl' />
						<Image
							width={800}
							height={800}
							src={`/images/about/${image}`}
							alt='Наша команда'
							className='w-full h-full object-cover aspect-square rounded-2xl from-primary/10 to-accent/10'
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default About;
