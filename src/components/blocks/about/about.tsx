import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { TAboutContent } from './type';
import { DynamicIcon } from '@/components/shared/dynamic-icon';
import { SectionTitle } from '@/components/shared/sections/section-title';
import { Section } from '@/components/shared/sections/section';
import { SectionBackground } from '@/components/shared/sections/section-background';
import { Container } from '@/components/shared/сontainer';
import { Typography } from '@/components/ui/typography';
import { Link } from '@/components/ui/link';

export const About = ({
	description,
	mission,
	stats,
	infoblocks,
	image,
	title,
	links,
	subtitle,
}: TAboutContent) => {
	return (
		<Section id={'about'}>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle title={title} subtitle={subtitle} description={mission} />
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

				<div className='grid md:grid-cols-2 gap-6 mb-20'>
					{infoblocks?.map((value, index) => (
						<Card
							key={index}
							className='p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/80 backdrop-blur-sm group'>
							<div className='flex items-start gap-4'>
								<div className='flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
									<DynamicIcon name={value.icon} className='w-6 h-6 text-primary' />
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

				{/* Story Section */}
				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<Typography.Title level={3}>Наша история</Typography.Title>
						<h3 className='text-3xl font-bold mb-6'></h3>
						<div className='space-y-4 text-muted-foreground leading-relaxed'>
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
						{links?.map((link) => (
							<Link className='mt-6' href={link.href} key={link.href}>
								Подробнее
							</Link>
						))}
					</div>
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
