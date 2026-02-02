export type TServicesCard = {
	title: string;
	description?: string;
	image?: string;
	icon?: string;
	features?: Array<string>;
	gradient?: string;
};

export type TServicesContent = {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	services: Array<TServicesCard>;
};

export type TServices = {
	id: string;
	type: string;
	content: TServicesContent;
};
