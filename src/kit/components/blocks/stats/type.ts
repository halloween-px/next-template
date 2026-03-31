export type StatItem = {
	value: string;
	label: string;
};

export type TStatsContent = {
	items: StatItem[];
};

export type TStats = {
	id: string;
	type: string;
	content: TStatsContent;
};
