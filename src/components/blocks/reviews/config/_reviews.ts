import { TReviews } from '../types';

export const REVIEWS_ID = 'section-reviews';
export const REVIEWS_TYPE = 'reviews';

export const reviewsConfig: TReviews = {
	id: REVIEWS_ID,
	type: REVIEWS_TYPE,
	content: {
		title: 'Отзывы',
		subtitle: 'Что говорят наши клиенты',
		description: 'Мы гордимся доверием наших клиентов и результатами нашей работы',
		reviews: [
			{
				id: '1',
				name: 'Иван Сидоров',
				role: 'CEO, TechStart',
				avatar: 'https://github.com/shadcn.png',
				textContent:
					'Команда превзошла все наши ожидания. Проект был завершен в срок и превосходного качества. Рекомендуем!',
				rating: 5,
			},
			{
				id: '2',
				name: 'Анна Кузнецова',
				role: 'Product Manager, InnovateLab',
				avatar: '',
				textContent:
					'Профессиональный подход и отличное понимание бизнес-задач. Результат превзошел наши ожидания.',
				rating: 5,
			},
			{
				id: '3',
				name: 'Павел Морозов',
				role: 'Founder, StartupHub',
				avatar: 'https://github.com/shadcn.png',
				textContent:
					'Отличная команда! Быстрая разработка, качественный код и приятное общение. Будем работать снова.',
				rating: 5,
			},
			{
				id: '4',
				name: 'Ольга Николаева',
				role: 'CTO, DigitalSolutions',
				avatar: '',
				textContent:
					'Впечатлены уровнем экспертизы и вниманием к деталям. Проект реализован на высшем уровне.',
				rating: 5,
			},
		],
	},
};
