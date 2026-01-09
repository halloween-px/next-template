export type AboutStats = {
	value: string;
	label: string;
};

export type TInfoBlock = { icon: string; title: string; description: string };

export type TAboutContent = {
	title: string;
	subtitle: string;
	description: string;
	mission?: string;
	stats?: Array<AboutStats>;
	infoblocks?: Array<TInfoBlock>;
	image?: string;
	buttons?: Array<{ label: string; link: string }>;
	links?: Array<{ label: string; href: string }>;
};

export type TAbout = {
	id: string;
	type: string;
	content: TAboutContent;
};
