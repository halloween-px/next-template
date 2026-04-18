import type { SiteModalId } from '@/kit/features/site-modals';
import type { TInfoBlockItem } from '@/kit/components/blocks/infoblocks/type';
import type { SectionTextAlign } from '@/types/section-layout';

export type AboutStats = {
	value: string;
	label: string;
};

/** Карточки смыслов для about-v2 (без блока infoblocks) */
export type AboutHighlight = {
	title: string;
	description: string;
};

/** Короткие факты в линию для about-v2 (не виджет stats) */
export type AboutFact = {
	label: string;
	value: string;
};

/** @deprecated используйте TInfoBlockItem из infoblocks/type */
export type TInfoBlock = TInfoBlockItem;

export type TAboutContent = {
	title: string;
	subtitle: string;
	description: string;
	mission?: string;
	stats?: Array<AboutStats>;
	infoblocks?: Array<TInfoBlockItem>;
	/** about-v2: акценты / ценности */
	highlights?: AboutHighlight[];
	/** about-v2: факты одной строкой */
	facts?: AboutFact[];
	image?: string;
	buttons?: Array<{ label: string; link: string }>;
	links?: Array<{ label: string; href: string; modal?: SiteModalId }>;
	/** Заголовок секции (eyebrow + главная строка в SectionTitle). */
	sectionTitleAlign?: SectionTextAlign;
	/** Описание в SectionTitle и основной текст ниже. */
	sectionBodyAlign?: SectionTextAlign;
	/** Поменять местами колонки (текст ↔ медиа), где есть сетка. */
	layoutReverse?: boolean;
};

export type TAbout = {
	id: string;
	type: string;
	content: TAboutContent;
};
