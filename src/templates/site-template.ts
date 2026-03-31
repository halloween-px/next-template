import { getSiteCompanyInfo } from './company';
import { heroConfig } from '@/kit/components/blocks/hero/config/_hero';
import { servicesConfig } from '@/kit/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/kit/components/blocks/teams/config/_team';
import { reviewsConfig } from '@/kit/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/kit/components/blocks/contacts/config/_contacts';
import { defaultAboutConfig } from './registry';
import { footerConfig } from '@/kit/components/blocks/footer/config/_footer';
import { headerConfig } from '@/kit/components/blocks/header/config/_header';

export const siteConfig = {
	id: 'site-tech-company',
	siteName: 'TechCompany',
	theme: {
		init: 'neutral',
		colorScheme: 'dark',
		primaryColor: 'blue',
		accentColor: 'cyan',
		fonts: {
			heading: 'Geist',
			body: 'Geist',
		},
	},

	companyInfo: getSiteCompanyInfo(),

	navigation: {
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
	},

	header: headerConfig,

	pages: [
		{
			id: 'main-landing',
			name: 'Главная',
			slug: '/',
			meta: {
				title: 'TechCompany | Инновационные решения для вашего бизнеса',
				description:
					'Мы создаем современные веб-приложения, которые помогают компаниям расти и развиваться в цифровую эпоху',
			},
			sections: [
				heroConfig,
				defaultAboutConfig,
				servicesConfig,
				portfoliosConfig,
				teamsConfig,
				reviewsConfig,
				contactsConfig,
			],
		},
	],

	footer: footerConfig,
};
