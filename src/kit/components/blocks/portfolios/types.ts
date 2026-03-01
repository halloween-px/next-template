export type TPortfoliosContent = {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	categories: Array<string>;
	projects: Array<{
		id: string;
		title: string;
		description: string;
		image?: string;
		icon?: string;
		category: string;
		technologies: Array<string>;
		link: string;
		github: string;
	}>;
};

export type TPortfolios = {
	id: string;
	type: string;
	content: TPortfoliosContent;
};
