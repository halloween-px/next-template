type Slide = {
	title: string;
	description: string;
	backgroundImage: string;
	contentPosition: {
		x: AlignmentX;
		y: AlignmentY;
	};
	buttons: Array<{
		label: string;
		link: string;
	}>;
};

export type THeroContent = {
	autoplay?: boolean;
	interval?: number;
	slides: Slide[];
};

export type THero = {
	id: string;
	type: string;
	content: THeroContent;
};

export type AlignmentX = 'left' | 'center' | 'right';
export type AlignmentY = 'top' | 'center' | 'bottom';
