import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { TAboutContent } from './type';
import { DynamicIcon } from '@/components/shared/dynamic-icon';
import { SectionTitle } from '@/components/shared/sections/section-title';
import { Section } from '@/components/shared/sections/section';
import { SectionBackground } from '@/components/shared/sections/section-background';
import { Container } from '@/components/shared/сontainer';

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
		<Section>
			<SectionBackground variant='orbs' />
			<Container>
				<SectionTitle title={title} subtitle={subtitle} description={mission} />

				<div className='relative mb-20'>
					<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl' />
					<div className='relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8'>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
							{stats?.map((stat, index) => (
								<div key={index} className='text-center'>
									<div className='text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2'>
										{stat.value}
									</div>
									<div className='text-sm text-muted-foreground uppercase tracking-wider'>
										{stat.label}
									</div>
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
									<h3 className='text-xl font-semibold mb-2'>{value.title}</h3>
									<p className='text-muted-foreground leading-relaxed'>{value.description}</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Story Section */}
				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<h3 className='text-3xl font-bold mb-6'>Наша история</h3>
						<div className='space-y-4 text-muted-foreground leading-relaxed'>
							<p>
								Компания была основана в 2010 году с простой целью — помогать бизнесу использовать
								технологии для достижения своих целей. За годы работы мы выросли из небольшой
								команды энтузиастов в крупное агентство с международным опытом.
							</p>
							<p>
								Сегодня мы специализируемся на разработке веб-приложений, мобильных решений и
								корпоративных систем. Наши клиенты — от стартапов до крупных корпораций, и каждому
								мы предлагаем индивидуальный подход и внимание к деталям.
							</p>
							<p>
								Мы гордимся тем, что наши решения помогают компаниям оптимизировать процессы,
								увеличивать прибыль и создавать лучший опыт для своих пользователей.
							</p>
						</div>
					</div>
					<div className='relative'>
						<div className='absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl' />
						<div className='relative aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden border border-border/50 shadow-xl'>
							<Image
								width={800}
								height={800}
								src={`/images/about/${image}`}
								alt='Наша команда'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default About;
