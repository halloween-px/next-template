/**
 * Глобальный пресет базового UI для превью / сохранённого сайта.
 * Хранится в `SiteConfig.uiKit`, мержится с дефолтами при чтении.
 */

import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';

export type SiteUiKit = {
	/** Глобальный вид `SectionTitle` в блоках с этим заголовком. */
	sectionTitle: SectionTitleVariant;
};

export const DEFAULT_SITE_UI_KIT: SiteUiKit = {
	sectionTitle: 'default',
};

export function mergeSiteUiKit(input?: Partial<SiteUiKit> | null): SiteUiKit {
	return {
		sectionTitle: input?.sectionTitle ?? DEFAULT_SITE_UI_KIT.sectionTitle,
	};
}
