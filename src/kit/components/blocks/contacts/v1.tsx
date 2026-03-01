'use client';

import type React from 'react';

import { Card, CardContent } from '@/kit/components/ui/card';
import { Input } from '@/kit/components/ui/input';
import { Textarea } from '@/kit/components/ui/textarea';
import { Button } from '@/kit/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/kit/components/shared/container';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { Typography } from '@/kit/components/ui/typography';

export default function ContactsV1() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
		phone: '',
		subject: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('[v0] Form submitted:', formData);
	};

	return (
		<section
			id='contact'
			className='relative py-24 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background'>
			<div className='absolute inset-0 -z-10'>
				{/* Grid pattern */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20' />

				{/* Animated gradient orbs */}
				<div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse' />
				<div
					className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse'
					style={{ animationDelay: '1s' }}
				/>
				<div
					className='absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-pulse'
					style={{ animationDelay: '2s' }}
				/>
			</div>
			<Container>
				<div className='container px-4 md:px-6'>
					<SectionTitle
						title={'Давайте начнем сотрудничество'}
						subtitle={'Свяжитесь с нами'}
						description={
							'Готовы обсудить ваш проект? Заполните форму, и наша команда свяжется с вами в течение 24 часов'
						}
					/>

					<div className='grid gap-8 lg:grid-cols-5 max-w-7xl mx-auto'>
						<div className='lg:col-span-3'>
							<Card className='border-2 border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl py-1'>
								<CardContent className='p-8 md:p-10'>
									<div className='space-y-3'>
										<Typography.Title level={4}>Отправить сообщение</Typography.Title>
										<Typography.Text color='muted' className='mb-8'>
											Заполните форму ниже, и мы свяжемся с вами в ближайшее время
										</Typography.Text>
									</div>

									<form onSubmit={handleSubmit} className='space-y-6'>
										<div className='grid md:grid-cols-2 gap-6'>
											<div className='space-y-2'>
												<label htmlFor='name' className='block text-sm font-semibold'>
													Ваше имя *
												</label>
												<Input
													id='name'
													placeholder='Иван Иванов'
													className='h-12 border-2 focus:border-primary transition-colors bg-background'
													value={formData.name}
													onChange={(e) => setFormData({ ...formData, name: e.target.value })}
													required
												/>
											</div>
											<div className='space-y-2'>
												<label htmlFor='email' className='block text-sm font-semibold'>
													Email *
												</label>
												<Input
													id='email'
													type='email'
													placeholder='ivan@example.com'
													className='h-12 border-2 focus:border-primary transition-colors bg-background'
													value={formData.email}
													onChange={(e) => setFormData({ ...formData, email: e.target.value })}
													required
												/>
											</div>
											<div className='space-y-2'>
												<label htmlFor='phone' className='block text-sm font-semibold'>
													Телефон
												</label>
												<Input
													id='phone'
													type='tel'
													placeholder='+7 (999) 123-45-67'
													className='h-14 border-2 focus:border-primary transition-all bg-background/50 backdrop-blur-sm text-base'
													value={formData.phone}
													onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
												/>
											</div>
											<div className='space-y-2'>
												<label htmlFor='subject' className='block text-sm font-semibold'>
													Тема обращения <span className='text-destructive'>*</span>
												</label>
												<Input
													id='subject'
													placeholder='Разработка веб-приложения'
													className='h-14 border-2 focus:border-primary transition-all bg-background/50 backdrop-blur-sm text-base'
													value={formData.subject}
													onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
													required
												/>
											</div>
										</div>

										<div className='space-y-2'>
											<label htmlFor='message' className='block text-sm font-semibold'>
												Ваше сообщение *
											</label>
											<Textarea
												id='message'
												placeholder='Расскажите нам о вашем проекте, целях и требованиях...'
												className='border-2 focus:border-primary transition-colors resize-none bg-background min-h-24'
												value={formData.message}
												onChange={(e) => setFormData({ ...formData, message: e.target.value })}
												required
											/>
										</div>

										<Button
											type='submit'
											size='lg'
											className='w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300'>
											<Send className='h-5 w-5 mr-2' />
											Отправить сообщение
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>

						<div className='lg:col-span-2 space-y-6'>
							<Card className='border-2 border-border/50 bg-gradient-to-br from-primary/10 via-background/80 to-background/80 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 group overflow-hidden relative'>
								<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
								<CardContent className='p-6 relative'>
									<div className='flex items-start gap-4'>
										<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform'>
											<Mail className='h-7 w-7' />
										</div>
										<div className='flex-1'>
											<h3 className='font-bold text-lg mb-2'>Email</h3>
											<a
												href='mailto:info@vercel.com'
												className='text-muted-foreground hover:text-primary transition-colors block mb-1'>
												info@vercel.com
											</a>
											<a
												href='mailto:support@vercel.com'
												className='text-muted-foreground hover:text-primary transition-colors block'>
												support@vercel.com
											</a>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='border-2 border-border/50 bg-gradient-to-br from-accent/10 via-background/80 to-background/80 backdrop-blur-xl hover:border-accent/50 transition-all duration-300 group overflow-hidden relative'>
								<div className='absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
								<CardContent className='p-6 relative'>
									<div className='flex items-start gap-4'>
										<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg group-hover:scale-110 transition-transform'>
											<Phone className='h-7 w-7' />
										</div>
										<div className='flex-1'>
											<h3 className='font-bold text-lg mb-2'>Телефон</h3>
											<a
												href='tel:+79991234567'
												className='text-muted-foreground hover:text-primary transition-colors block mb-1'>
												+7 (999) 123-45-67
											</a>
											<a
												href='tel:+79997654321'
												className='text-muted-foreground hover:text-primary transition-colors block'>
												+7 (999) 765-43-21
											</a>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className='border-2 border-border/50 bg-gradient-to-br from-primary/5 via-background/80 to-background/80 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 group overflow-hidden relative'>
								<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
								<CardContent className='p-6 relative'>
									<div className='flex items-start gap-4'>
										<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/20 shadow-lg transition-all group-hover:scale-110'>
											<MapPin className='h-7 w-7 text-primary' />
										</div>
										<div className='flex-1'>
											<h3 className='font-bold text-lg mb-2'>Офис</h3>
											<p className='text-muted-foreground mb-1'>г. Москва, ул. Примерная, д. 123</p>
											<p className='text-muted-foreground text-sm'>Бизнес-центр "Технопарк"</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
