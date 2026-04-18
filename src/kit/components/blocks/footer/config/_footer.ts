import { company, getFooterContacts, getFooterSocial } from '@/templates/company';
import type { TFooter } from '../type';

export const footerConfig: TFooter = {
	type: 'footer-v1',
	id: 'section-footer',
	content: {
		tagline: company.tagline,
		companyInfo: {
			name: company.name,
			description: company.description,
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
					{ label: 'Политика конфиденциальности', href: '/privacy' },
					{ label: 'Условия использования', href: '/terms' },
				],
			},
		],
		contacts: getFooterContacts(),
		social: getFooterSocial(),
		ctas: [
			{ label: 'Связаться', href: '#contacts', variant: 'default', modal: 'contact' },
			{ label: 'Портфолио', href: '#portfolio', variant: 'outline' },
		],
		bottomLinks: [
			{ label: 'Политика конфиденциальности', href: '/privacy' },
			{ label: 'Пользовательское соглашение', href: '/terms' },
		],
	},
};
