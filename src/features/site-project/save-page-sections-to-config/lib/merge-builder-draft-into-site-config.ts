import type { Block, SiteConfig } from '@/types/site';

/** Секции первой страницы из стора билдера в конфиг проекта. */
export function mergeBuilderDraftIntoSiteConfig(config: SiteConfig, sections: Block[]): SiteConfig {
	return {
		...config,
		pages: config.pages.map((page, i) => (i === 0 ? { ...page, sections } : page)),
	};
}
