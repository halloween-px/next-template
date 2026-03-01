import { NavGroup } from '@/kit/components/shared/navigation/types';
import { THeader } from '../type';

const defaultNavigation: NavGroup[] = [
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
];

export const headerConfig: THeader = {
	type: 'header-v1',
	id: 'section-header',
	content: {
		sticky: true,
		navigationVariant: 'menu',
		showPhone: true,
		navigationData: defaultNavigation,
		buttons: [
			{
				href: '/login',
				label: 'Войти',
				variant: 'outline',
			},
			{
				href: '/signup',
				label: 'Начать',
				variant: 'default',
			},
		],
	},
};
