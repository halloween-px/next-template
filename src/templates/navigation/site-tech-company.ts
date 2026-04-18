import type { NavigationConfig } from '@/types/site';

/** Навигация хедера для дефолтного шаблона `site-tech-company`. */
export const siteTechCompanyNavigation: NavigationConfig = {
	links: [
		{
			title: 'Услуги',
			href: '#services',
			items: [
				{
					title: 'Веб-разработка',
					href: '#services',
					description: 'Современные веб-приложения и сайты',
				},
				{
					title: 'Мобильная разработка',
					href: '#services',
					description: 'iOS и Android приложения',
				},
				{
					title: 'Backend решения',
					href: '#services',
					description: 'Серверная разработка и API',
				},
			],
		},
		{
			title: 'О компании',
			href: '#about',
			items: [
				{
					title: 'Наша миссия',
					href: '#about',
					description: 'Цели и ценности компании',
				},
				{
					title: 'Команда',
					href: '#team',
					description: 'Познакомьтесь с нашей командой',
				},
				{
					title: 'Достижения',
					href: '#about',
					description: 'Наши успехи и результаты',
				},
			],
		},
		{
			title: 'Портфолио',
			href: '#portfolio',
			items: [
				{
					title: 'Веб-проекты',
					href: '#portfolio',
					description: 'Примеры наших работ',
				},
				{
					title: 'Кейсы',
					href: '#portfolio',
					description: 'Истории успеха клиентов',
				},
				{
					title: 'Отзывы',
					href: '#testimonials',
					description: 'Что говорят наши клиенты',
				},
			],
		},
	],
};
