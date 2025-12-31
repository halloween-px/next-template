export const portfolioTemplate = {
	id: 'section-portfolio',
	type: 'portfolio',
	content: {
		title: 'Портфолио',
		subtitle: 'Наши последние проекты',
		categories: ['Все', 'Web', 'Mobile', 'Design'],
		projects: [
			{
				title: 'E-commerce платформа',
				description: 'Многофункциональный интернет-магазин',
				category: 'Web',
				image: '/project-ecommerce.jpg',
				technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
			},
			{
				title: 'SaaS приложение',
				description: 'Облачная платформа для управления проектами',
				category: 'Web',
				image: '/project-saas.jpg',
				technologies: ['React', 'Node.js', 'AWS'],
			},
			{
				title: 'Мобильное приложение',
				description: 'Кроссплатформенное приложение для фитнес-трекинга',
				category: 'Mobile',
				image: '/project-mobile.jpg',
				technologies: ['React Native', 'Firebase'],
			},
			{
				title: 'CRM система',
				description: 'Корпоративная система управления взаимоотношениями',
				category: 'Web',
				image: '/project-crm.jpg',
				technologies: ['Vue.js', 'Python', 'MongoDB'],
			},
			{
				title: 'Дизайн-система',
				description: 'Комплексная UI библиотека для крупной компании',
				category: 'Design',
				image: '/project-ecommerce.jpg',
				technologies: ['Figma', 'Storybook', 'React'],
			},
			{
				title: 'Корпоративный портал',
				description: 'Внутренний портал для сотрудников',
				category: 'Web',
				image: '/project-saas.jpg',
				technologies: ['Next.js', 'GraphQL', 'Vercel'],
			},
		],
	},
};
