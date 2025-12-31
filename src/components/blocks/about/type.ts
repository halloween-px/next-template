export type AboutStats = {
	value: string;
	label: string;
};

export type TAboutContent = {
	title: string;
	subtitle: string;
	description: string;
	mission: string;
	stats: Array<AboutStats>;
	infoblocks: Array<{ icon: string; title: string; description: string }>;
	image: string;
};

export type TAbout = {
	id: string;
	type: 'about';
	content: TAboutContent;
};
