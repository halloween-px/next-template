import { TPortfolios } from '../types';

export const PORTFOLIOS_ID = 'section-portfolios';
export const PORTFOLIOS_TYPE = 'portfolios';

export const portfoliosConfig: TPortfolios = {
	id: PORTFOLIOS_ID,
	type: PORTFOLIOS_TYPE,
	content: {
		title: 'Портфолио',
		subtitle: 'Наши проекты',
		description: 'Примеры успешно реализованных проектов для наших клиентов',
		categories: ['Все', 'Веб', 'Мобильное', 'Backend'],
		projects: [
			{
				id: '1',
				title: 'E-Commerce Platform',
				description:
					'Полнофункциональная платформа электронной коммерции с интеграцией платежей и управлением заказами',
				image: 'project-ecommerce.jpg',
				category: 'Веб',
				technologies: ['Next.js', 'React', 'Stripe', 'PostgreSQL'],
				link: '#',
				github: '#',
			},
			{
				id: '2',
				title: 'SaaS Dashboard',
				description:
					'Современная панель управления для SaaS с аналитикой в реальном времени и управлением пользователями',
				image: 'project-saas.jpg',
				category: 'Веб',
				technologies: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
				link: '#',
				github: '#',
			},
			{
				id: '3',
				title: 'Mobile Banking App',
				description: 'Безопасное мобильное банковское приложение с биометрической аутентификацией',
				image: 'project-mobile.jpg',
				category: 'Мобильное',
				technologies: ['React Native', 'Node.js', 'MongoDB'],
				link: '#',
				github: '#',
			},
			{
				id: '4',
				title: 'CRM System',
				description:
					'Система управления взаимоотношениями с клиентами для малого и среднего бизнеса',
				image: 'project-crm.jpg',
				category: 'Веб',
				technologies: ['Vue.js', 'Express', 'MySQL'],
				link: '#',
				github: '#',
			},
		],
		image: '',
	},
};
