import { resolveThemeLayers } from '@/kit/styles/registry';
import type { SiteThemePaletteId, ThemeConfig, ThemeLayers } from '@/types/site';

export function patchThemeLayers(theme: ThemeConfig, patch: Partial<ThemeLayers>): ThemeConfig {
	const next = { ...resolveThemeLayers(theme), ...patch };
	let palette: SiteThemePaletteId | undefined = theme.palette;
	if (patch.base !== undefined) {
		palette = next.base as SiteThemePaletteId;
	} else if (patch.accent !== undefined) {
		palette = next.accent as SiteThemePaletteId;
	}
	return { ...theme, themeLayers: next, palette };
}
