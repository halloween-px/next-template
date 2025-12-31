export type TReviewsContent = {
	title: string;
	subtitle: string;
	description: string;
	reviews: Array<{
		id: string;
		name: string;
		role: string;
		avatar: string;
		textContent: string;
		rating: number;
	}>;
};

export type TReviews = {
	id: string;
	type: string;
	content: TReviewsContent;
};
