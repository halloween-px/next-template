import type { CardHoverPreset } from '@/kit/components/shared/interactive-card/card-hover-variants';
import type { SectionTextAlign } from '@/types/section-layout';

export type TServicesCard = {
	title: string;
	description?: string;
	image?: string;
	icon?: string;
	features?: Array<string>;
	gradient?: string;
	/** Пресет hover с `card-hover-variants`; по умолчанию `lift`. */
	cardHover?: CardHoverPreset;
};

export type TServicesContent = {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	services: Array<TServicesCard>;
	sectionTitleAlign?: SectionTextAlign;
	sectionBodyAlign?: SectionTextAlign;
	/** Для services-v2: заголовок слева / карточки справа ↔ наоборот. */
	layoutReverse?: boolean;
};

export type TServices = {
	id: string;
	type: string;
	content: TServicesContent;
};
