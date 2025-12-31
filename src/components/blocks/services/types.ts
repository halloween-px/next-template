export type TServicesContent = {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	services: Array<{
		title: string;
		description: string;
		image?: string;
		icon?: string;
		features?: Array<string>;
		gradient?: string;
	}>;
};

export type TServices = {
	id: string;
	type: 'services';
	content: TServicesContent;
};
