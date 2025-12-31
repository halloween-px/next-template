import { heroConfig } from '@/components/blocks/hero/config/_hero';
import { navigationTemplate } from './_navigation';
import { aboutConfig } from '@/components/blocks/about/config/_about';
import { servicesConfig } from '@/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/components/blocks/team/config/_team';
import { reviewsConfig } from '@/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/components/blocks/contacts/config/_contacts';

export const landingTemplate = {
	id: 'site-tech-company',
	siteName: 'TechCompany',
	theme: {
		colorScheme: 'dark',
		primaryColor: 'blue',
		accentColor: 'cyan',
		fonts: {
			heading: 'Geist',
			body: 'Geist',
		},
	},
	navigation: navigationTemplate,
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
				aboutConfig,
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
