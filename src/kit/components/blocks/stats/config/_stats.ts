import type { TStats } from '../type';

export const STATS_ID = 'section-stats';
export const STATS_TYPE = 'stats-v1';

const items = [
	{ value: '500+', label: 'Проектов' },
	{ value: '50+', label: 'Специалистов' },
	{ value: '15+', label: 'Лет опыта' },
	{ value: '98%', label: 'Довольных клиентов' },
];

export const statsConfig: TStats = {
	id: STATS_ID,
	type: STATS_TYPE,
	content: { items },
};
