import { AlignmentX, AlignmentY } from '../type';

export const getContentPositionX = (alignment: AlignmentX) => {
	switch (alignment) {
		case 'left':
			return 'justify-start text-left';
		case 'center':
			return 'justify-center text-center';
		case 'right':
			return 'justify-end text-right';
	}
};

export const getContentPositionY = (alignment: AlignmentY) => {
	switch (alignment) {
		case 'top':
			return 'items-start';
		case 'center':
			return 'items-center';
		case 'bottom':
			return 'items-end';
	}
};
