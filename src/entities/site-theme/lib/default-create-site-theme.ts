import { withCapturedSemanticColors } from '@/entities/site-theme/lib/capture-theme-semantic-colors';
import { siteConfig } from '@/templates/site-template';
import type { ColorScheme, ThemeConfig } from '@/types/site';

/** Тема нового проекта из дефолтного шаблона (`site-template`). */
export function getDefaultCreateSiteThemeConfig(): ThemeConfig {
	return {
		...siteConfig.theme,
		colorScheme: siteConfig.theme.colorScheme as ColorScheme,
	} as ThemeConfig;
}

/**
 * То же для UI модалки: цвета primary/chart совпадают с CSS слоёв (как в лаборатории).
 * Вне браузера — без пересчёта capture.
 */
export function getDefaultCreateSiteThemeForUi(): ThemeConfig {
	const base = getDefaultCreateSiteThemeConfig();
	if (typeof window === 'undefined') return base;
	return withCapturedSemanticColors(base);
}
