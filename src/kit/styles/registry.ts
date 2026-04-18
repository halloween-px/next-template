import type { SiteThemePaletteId, ThemeConfig } from '@/types/site';

export type { SiteThemePaletteId };

export {
	DEFAULT_THEME_LAYERS,
	SITE_THEME_ACCENTS,
	SITE_THEME_BASES,
	SITE_THEME_CHARTS,
	SITE_THEME_STYLES,
	resolveThemeLayers,
} from './theme-registry';

/** Порядок как в `site-theme.css` (@import палитр). */
export const SITE_THEME_PALETTES = [
	'slate',
	'zinc',
	'neutral',
	'stone',
	'gray',
	'violet',
	'rose',
	'emerald',
	'ocean',
	'sunset',
	'yellow',
] as const satisfies readonly SiteThemePaletteId[];

export const DEFAULT_SITE_THEME_PALETTE: SiteThemePaletteId = 'slate';

export function resolveSiteThemePalette(theme: ThemeConfig): SiteThemePaletteId {
	const p = theme.palette;
	if (p && (SITE_THEME_PALETTES as readonly string[]).includes(p)) {
		return p;
	}
	return DEFAULT_SITE_THEME_PALETTE;
}
