import { THero } from '../type';

export const HERO_ID = 'section-hero';
export const HERO_TYPE = 'hero';

export const heroConfig: THero = {
	id: HERO_ID,
	type: HERO_TYPE,
	content: {
		autoplay: true,
		interval: 5000,
		slides: [
			{
				title: 'Добро пожаловать в будущее',
				description: 'Создавайте невероятные продукты с помощью современных технологий',
				backgroundImage: '/images/hero/futuristic-technology-abstract.jpg',
				contentPosition: {
					x: 'left',
					y: 'center',
				},
				buttons: [
					{
						label: 'Начать',
						link: '#',
					},
					{
						label: 'Оставить заявку',
						link: '#',
					},
				],
			},
			{
				title: 'Инновации без границ',
				description: 'Раскройте свой потенциал с помощью наших решений',
				backgroundImage: '/images/hero/innovation-abstract-blue.jpg',
				contentPosition: {
					x: 'center',
					y: 'center',
				},
				buttons: [
					{
						label: 'Узнать больше',
						link: '#',
					},
				],
			},
			{
				title: 'Ваш успех начинается здесь',
				description: 'Присоединяйтесь к тысячам довольных клиентов',
				backgroundImage: '/images/hero/success-growth-abstract.jpg',
				contentPosition: {
					x: 'right',
					y: 'center',
				},
				buttons: [
					{
						label: 'Связаться',
						link: '#',
					},
				],
			},
		],
	},
};
