import { HERO_ID, HERO_TYPES, type THero } from './_hero.constants';

export const heroConfig: THero = {
	id: HERO_ID,
	type: HERO_TYPES.V1,
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
						modal: 'discussProject',
					},
					{
						label: 'Оставить заявку',
						link: '#',
						modal: 'contact',
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
						modal: 'contact',
					},
				],
			},
		],
	},
};
