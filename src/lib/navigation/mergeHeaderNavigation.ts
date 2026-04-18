import type { THeaderProps } from '@/kit/components/blocks/header/type';
import type { NavigationConfig } from '@/types/site';
import type { SiteCompanyInfo } from '@/types/site-company-info';

/** Подставляет `site.navigation.links` и при необходимости `companyInfo` в хедер. */
export function mergeHeaderWithSiteNavigation(
	headerContent: THeaderProps,
	navigation: NavigationConfig,
	companyInfo?: SiteCompanyInfo | null,
): THeaderProps {
	return {
		...headerContent,
		navigationData: navigation.links,
		...(companyInfo ? { companyInfo } : {}),
	};
}
