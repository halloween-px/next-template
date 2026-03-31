import type { TInfoblocksContent, TInfoBlockItem } from '@/kit/components/blocks/infoblocks/type';
import type { TStatsContent } from '@/kit/components/blocks/stats/type';

/** Фрагменты, встраиваемые в about (порядок = порядок в конфиге) */
export type AboutPart =
	| { type: 'stats-v1'; content: TStatsContent }
	| { type: 'infoblocks-v1'; content: TInfoblocksContent };

/** @deprecated используйте StatItem из stats/type */
export type AboutStats = {
	value: string;
	label: string;
};

/** @deprecated используйте TInfoBlockItem из infoblocks/type */
export type TInfoBlock = TInfoBlockItem;

export type TAboutContent = {
	title: string;
	subtitle: string;
	description: string;
	mission?: string;
	/**
	 * Составные куски (stats, infoblocks, …).
	 * Если задано — приоритет над legacy `stats` / `infoblocks`.
	 */
	parts?: AboutPart[];
	/** @deprecated предпочтительно parts: [{ type: 'stats-v1', content: { items } }] */
	stats?: Array<AboutStats>;
	/** @deprecated предпочтительно parts: [{ type: 'infoblocks-v1', content: { items } }] */
	infoblocks?: Array<TInfoBlockItem>;
	image?: string;
	buttons?: Array<{ label: string; link: string }>;
	links?: Array<{ label: string; href: string }>;
};

export type TAbout = {
	id: string;
	type: string;
	content: TAboutContent;
};
