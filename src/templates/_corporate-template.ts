import { heroConfig } from '@/components/blocks/hero/config/_hero';
import { servicesConfig } from '@/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/components/blocks/team/config/_team';
import { reviewsConfig } from '@/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/components/blocks/contacts/config/_contacts';
import { defaultAboutConfig } from './registry/_about';
import { aboutPageConfig } from './pages';

export const corporateTemplate = {
	id: 'corporate-site',
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
		aboutPageConfig,
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
