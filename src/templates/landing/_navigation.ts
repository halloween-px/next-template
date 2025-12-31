export const navigationTemplate = [
	{ label: 'Главная', href: '#hero' },
	{ label: 'О нас', href: '#about' },
	{
		label: 'Услуги',
		href: '#services',
		dropdown: [
			{
				label: 'Веб-разработка',
				description: 'Современные веб-приложения',
				href: '#services',
			},
			{
				label: 'Мобильная разработка',
				description: 'iOS и Android приложения',
				href: '#services',
			},
			{ label: 'UI/UX Дизайн', description: 'Красивые интерфейсы', href: '#services' },
		],
	},
	{ label: 'Портфолио', href: '#portfolio' },
	{ label: 'Команда', href: '#team' },
	{ label: 'Отзывы', href: '#testimonials' },
	{ label: 'Контакты', href: '#contact' },
];
