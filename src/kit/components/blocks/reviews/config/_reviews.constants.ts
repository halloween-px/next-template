import type { TReviewsContent } from '../types';

export const REVIEWS_ID = 'section-reviews';

export const REVIEWS_TYPES = {
	V1: 'reviews-v1',
	V2: 'reviews-v2',
	V3: 'reviews-v3',
} as const;

/** @deprecated используйте REVIEWS_TYPES.V1 */
export const REVIEWS_TYPE = REVIEWS_TYPES.V1;

export function defaultReviewsPreset(): TReviewsContent {
	return {
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
	};
}
