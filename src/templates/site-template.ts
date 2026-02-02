import { heroConfig } from '@/components/blocks/hero/config/_hero';
import { servicesConfig } from '@/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/components/blocks/teams/config/_team';
import { reviewsConfig } from '@/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/components/blocks/contacts/config/_contacts';
import { defaultAboutConfig } from './registry';
import { headerConfig } from '@/components/blocks/header/config/_header';

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

	companyInfo: {
		name: 'TechCompany',
		description: 'Создаем инновационные цифровые решения',
		logo: {
			text: 'TechCompany',
			image: '/logo.svg',
			link: '',
		},
		contacts: {
			phone: '+7 999 123-45-67',
			email: 'info@techcompany.ru',
			address: 'Москва, ул. Примерная, 1',
		},
		social: {
			github: '#',
			twitter: '#',
			linkedin: '#',
			facebook: '#',
		},
	},

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

	footer: {
		companyInfo: {
			name: 'TechCompany',
			description: 'Создаем инновационные цифровые решения для вашего бизнеса',
		},
		columns: [
			{
				title: 'Компания',
				links: [
					{ label: 'О нас', href: '#about' },
					{ label: 'Команда', href: '#team' },
					{ label: 'Карьера', href: '#' },
					{ label: 'Блог', href: '#' },
				],
			},
			{
				title: 'Услуги',
				links: [
					{ label: 'Веб-разработка', href: '#services' },
					{ label: 'Мобильные приложения', href: '#services' },
					{ label: 'UI/UX дизайн', href: '#services' },
					{ label: 'Консалтинг', href: '#services' },
				],
			},
			{
				title: 'Поддержка',
				links: [
					{ label: 'Контакты', href: '#contact' },
					{ label: 'FAQ', href: '#' },
					{ label: 'Политика конфиденциальности', href: '#' },
					{ label: 'Условия использования', href: '#' },
				],
			},
		],
		social: [
			{ platform: 'github', url: '#' },
			{ platform: 'twitter', url: '#' },
			{ platform: 'linkedin', url: '#' },
			{ platform: 'facebook', url: '#' },
		],
		copyright: '© 2025 TechCompany. Все права защищены.',
	},
};
