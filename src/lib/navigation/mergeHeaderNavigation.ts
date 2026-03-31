import type { THeaderProps } from '@/kit/components/blocks/header/type';
import type { NavigationConfig } from '@/types/site';

/** Подставляет `site.navigation.links` в хедер — один источник правды по меню. */
export function mergeHeaderWithSiteNavigation(
	headerContent: THeaderProps,
	navigation: NavigationConfig
): THeaderProps {
	return {
		...headerContent,
		navigationData: navigation.links,
	};
}
