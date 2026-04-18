import type { SiteConfig } from '@/types/site';
import type { ThemeDraft } from '../model/theme-draft';
import { themeDraftToThemeConfig } from '../model/theme-draft';

/** Глубокая копия + подстановка темы из мастера. */
export function applyThemeDraftToSiteConfig(base: SiteConfig, draft: ThemeDraft): SiteConfig {
	const next = JSON.parse(JSON.stringify(base)) as SiteConfig;
	next.theme = themeDraftToThemeConfig(draft);
	return next;
}
