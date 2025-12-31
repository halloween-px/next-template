'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { TPortfoliosContent } from './types';
import { Container } from '@/components/shared/сontainer';
import { SectionTitle } from '@/components/shared/sections/section-title';

const Portfolio = ({
	categories,
	description,
	image,
	projects,
	subtitle,
	title,
}: TPortfoliosContent) => {
	const [activeCategory, setActiveCategory] = useState('Все');

	const filteredProjects =
		activeCategory === 'Все'
			? projects
			: projects.filter((project) => project.category === activeCategory);

	return (
		<section id='portfolio' className='relative py-24 overflow-hidden'>
			{/* Background decorations */}
			<div className='absolute inset-0 -z-10'>
				<div className='absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
				<div className='absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl' />
			</div>
			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle title={title} subtitle={subtitle} description={description} />

					{/* Category filters */}
					<div className='flex flex-wrap justify-center gap-2 mb-12'>
						{categories.map((category) => (
							<Button
								key={category}
								variant={activeCategory === category ? 'default' : 'outline'}
								onClick={() => setActiveCategory(category)}
								className='transition-all'>
								{category}
							</Button>
						))}
					</div>

					{/* Projects grid */}
					<div className='grid gap-8 md:grid-cols-2'>
						{filteredProjects.map((project) => (
							<Card
								key={project.id}
								className='group overflow-hidden pt-0 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl'>
								<div className='relative h-64 overflow-hidden'>
									<Image
										src={project.image ? `/images/portfolios/${project.image}` : '/placeholder.svg'}
										alt={project.title}
										fill
										className='object-cover transition-transform duration-300 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60' />
								</div>
								<CardContent className='p-6'>
									<h3 className='text-2xl font-bold mb-2 group-hover:text-primary transition-colors'>
										{project.title}
									</h3>
									<p className='text-muted-foreground mb-4'>{project.description}</p>
									<div className='flex flex-wrap gap-2 mb-4'>
										{project.technologies.map((tech) => (
											<Badge key={tech} variant='secondary'>
												{tech}
											</Badge>
										))}
									</div>
									<div className='flex gap-3'>
										<Button size='sm' asChild>
											<a href={project.link} target='_blank' rel='noopener noreferrer'>
												<ExternalLink className='h-4 w-4 mr-2' />
												Просмотр
											</a>
										</Button>
										<Button size='sm' variant='outline' asChild>
											<a href={project.github} target='_blank' rel='noopener noreferrer'>
												<Github className='h-4 w-4 mr-2' />
												Код
											</a>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Portfolio;
