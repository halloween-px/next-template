import type { Block, SiteConfig } from '@/types/site';

/** Подставляет секции билдера в первую страницу конфига (остальные страницы без изменений). */
export function mergeSectionsIntoFirstPage(config: SiteConfig, sections: Block[]): SiteConfig {
	return {
		...config,
		pages: config.pages.map((page, i) => (i === 0 ? { ...page, sections } : page)),
	};
}
