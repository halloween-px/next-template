export type TReviewsItem = {
	id: string;
	name: string;
	role: string;
	avatar: string;
	textContent: string;
	rating: number;
};

import type { SectionTextAlign } from '@/types/section-layout';

export type TReviewsContent = {
	title: string;
	subtitle: string;
	description: string;
	reviews: Array<TReviewsItem>;
	sectionTitleAlign?: SectionTextAlign;
	sectionBodyAlign?: SectionTextAlign;
};

export type TReviews = {
	id: string;
	type: string;
	content: TReviewsContent;
};
