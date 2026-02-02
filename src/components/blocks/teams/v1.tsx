import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Github, Section } from 'lucide-react';
import Image from 'next/image';
import { TTeamsContent } from './types';
import { Container } from '@/components/shared/container';
import { SectionTitle } from '@/components/shared/sections/section-title';

export default function TeamV1({ description, subtitle, teams, title }: TTeamsContent) {
	return (
		<section id='team' className='relative py-24 overflow-hidden bg-muted/30'>
			{/* Background grid pattern */}
			<div
				className='absolute inset-0 -z-10 opacity-10'
				style={{
					backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
					backgroundSize: '40px 40px',
				}}
			/>

			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle title={title} subtitle={subtitle} description={description} />

					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
						{teams.map((member) => (
							<Card
								key={member.id}
								className='group overflow-hidden hover:shadow-2xl transition-all duration-300'>
								<div className='relative h-80 overflow-hidden'>
									<Image
										src={member.image ? `/images/team/${member.image}` : '/placeholder.svg'}
										alt={member.name}
										fill
										className='object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-90' />
									<div className='absolute bottom-0 left-0 right-0 p-6'>
										<h3 className='text-xl font-bold text-foreground mb-1'>{member.name}</h3>
										<p className='text-sm text-primary font-medium mb-3'>{member.role}</p>
										<div className='flex gap-2'>
											<Button
												size='icon'
												variant='ghost'
												className='h-8 w-8 hover:bg-primary/20'
												asChild>
												<a href={member.social.linkedin} target='_blank' rel='noopener noreferrer'>
													<Linkedin className='h-4 w-4' />
												</a>
											</Button>
											<Button
												size='icon'
												variant='ghost'
												className='h-8 w-8 hover:bg-primary/20'
												asChild>
												<a href={member.social.twitter} target='_blank' rel='noopener noreferrer'>
													<Twitter className='h-4 w-4' />
												</a>
											</Button>
											<Button
												size='icon'
												variant='ghost'
												className='h-8 w-8 hover:bg-primary/20'
												asChild>
												<a href={member.social.github} target='_blank' rel='noopener noreferrer'>
													<Github className='h-4 w-4' />
												</a>
											</Button>
										</div>
									</div>
								</div>
								<CardContent className='p-6'>
									<p className='text-sm text-muted-foreground leading-relaxed'>{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
