import type { TPortfolios } from '../types';

export const PORTFOLIOS_ID = 'section-portfolios';

export const PORTFOLIOS_TYPES = {
	V1: 'portfolios-v1',
	V2: 'portfolios-v2',
	V3: 'portfolios-v3',
} as const;

/** @deprecated используйте PORTFOLIOS_TYPES.V1 */
export const PORTFOLIOS_TYPE = PORTFOLIOS_TYPES.V1;

/** Общие данные пресета — все варианты используют один контент, разная вёрстка. */
export function defaultPortfoliosPreset(): Omit<TPortfolios, 'id' | 'type'>['content'] {
	return {
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
				gallery: [
					'project-ecommerce.jpg',
					'project-saas.jpg',
					'project-mobile.jpg',
					'project-crm.jpg',
					'project-ecommerce.jpg',
					'project-saas.jpg',
					'project-mobile.jpg',
				],
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
				gallery: [
					'project-saas.jpg',
					'project-crm.jpg',
					'project-ecommerce.jpg',
					'project-mobile.jpg',
					'project-saas.jpg',
					'project-crm.jpg',
				],
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
				gallery: [
					'project-mobile.jpg',
					'project-ecommerce.jpg',
					'project-saas.jpg',
					'project-crm.jpg',
				],
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
				gallery: [
					'project-crm.jpg',
					'project-mobile.jpg',
					'project-ecommerce.jpg',
					'project-saas.jpg',
					'project-crm.jpg',
					'project-mobile.jpg',
					'project-ecommerce.jpg',
					'project-saas.jpg',
				],
				category: 'Веб',
				technologies: ['Vue.js', 'Express', 'MySQL'],
				link: '#',
				github: '#',
			},
		],
		image: '',
	};
}
