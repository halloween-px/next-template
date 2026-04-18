import type { SectionTextAlign } from '@/types/section-layout';

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
		/** Миниатюры под карточкой (portfolios-v2): до 5 в ряд, остальное — «Показать ещё». */
		gallery?: string[];
		icon?: string;
		category: string;
		technologies: Array<string>;
		link: string;
		github: string;
	}>;
	sectionTitleAlign?: SectionTextAlign;
	sectionBodyAlign?: SectionTextAlign;
};

export type TPortfolios = {
	id: string;
	type: string;
	content: TPortfoliosContent;
};
