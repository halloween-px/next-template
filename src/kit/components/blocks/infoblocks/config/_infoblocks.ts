import type { TInfoblocks } from '../type';

export const INFOBLOCKS_ID = 'section-infoblocks';
export const INFOBLOCKS_TYPE = 'infoblocks-v1';

const items = [
	{
		icon: 'Lightbulb',
		title: 'Инновации',
		description:
			'Мы постоянно развиваемся и внедряем передовые технологии для создания лучших решений',
	},
	{
		icon: 'Users',
		title: 'Команда',
		description:
			'Наша сила в людях — профессионалах своего дела, которые работают как единое целое',
	},
	{
		icon: 'Target',
		title: 'Результат',
		description: 'Мы нацелены на достижение конкретных результатов и превосходим ожидания клиентов',
	},
	{
		icon: 'Award',
		title: 'Качество',
		description:
			'Каждый проект выполняется с максимальным вниманием к деталям и высоким стандартам',
	},
];

export const infoblocksConfig: TInfoblocks = {
	id: INFOBLOCKS_ID,
	type: INFOBLOCKS_TYPE,
	content: { items },
};
