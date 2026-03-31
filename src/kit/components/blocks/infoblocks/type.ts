export type TInfoBlockItem = {
	icon: string;
	title: string;
	description: string;
};

export type TInfoblocksContent = {
	items: TInfoBlockItem[];
};

export type TInfoblocks = {
	id: string;
	type: string;
	content: TInfoblocksContent;
};
