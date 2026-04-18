import { SERVICES_ID, SERVICES_TYPES, type TServices } from './_services.constants';

/** services-v1: сетка карточек + CTA внизу */
export const servicesConfig: TServices = {
	id: SERVICES_ID,
	type: SERVICES_TYPES.V1,
	content: {
		title: 'Услуги',
		subtitle: 'Полный спектр digital-услуг',
		description:
			'От концепции до реализации - мы предлагаем комплексные решения для вашего цифрового успеха',
		services: [
			{
				icon: 'Code',
				title: 'Веб-разработка',
				description:
					'Создаем современные веб-приложения и сайты с использованием передовых технологий. От корпоративных порталов до сложных SaaS-платформ.',
				features: ['React & Next.js', 'TypeScript', 'Адаптивный дизайн', 'SEO-оптимизация'],
				gradient: 'from-blue-500/10 to-cyan-500/10',
			},
			{
				icon: 'Smartphone',
				title: 'Мобильные приложения',
				description:
					'Разрабатываем нативные и кроссплатформенные мобильные приложения для iOS и Android с интуитивным интерфейсом.',
				features: ['React Native', 'Flutter', 'iOS & Android', 'Push-уведомления'],
				gradient: 'from-purple-500/10 to-pink-500/10',
			},
			{
				icon: 'Database',
				title: 'Backend & API',
				description:
					'Проектируем и разрабатываем масштабируемые серверные решения с надежной архитектурой и высокой производительностью.',
				features: ['Node.js', 'REST API', 'GraphQL', 'Микросервисы'],
				gradient: 'from-green-500/10 to-emerald-500/10',
			},
			{
				icon: 'Cloud',
				title: 'Cloud-решения',
				description:
					'Помогаем перенести инфраструктуру в облако, настраиваем CI/CD и обеспечиваем бесперебойную работу ваших сервисов.',
				features: ['AWS', 'Vercel', 'Docker', 'Kubernetes'],
				gradient: 'from-orange-500/10 to-yellow-500/10',
			},
			{
				icon: 'Globe',
				title: 'UI/UX дизайн',
				description:
					'Создаем привлекательные и удобные интерфейсы, которые повышают вовлеченность пользователей и конверсию.',
				features: ['Figma', 'Прототипирование', 'Дизайн-система', 'A/B тестирование'],
				gradient: 'from-rose-500/10 to-red-500/10',
			},
			{
				icon: 'ShieldCheck',
				title: 'Консалтинг',
				description:
					'Предоставляем экспертные консультации по выбору технологий, оптимизации процессов и цифровой трансформации.',
				features: ['Аудит кода', 'Архитектура', 'Стратегия', 'Менторинг'],
				gradient: 'from-indigo-500/10 to-violet-500/10',
			},
		],
		image: '',
	},
};
