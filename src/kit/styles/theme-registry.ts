import type {
	SiteThemeAccentId,
	SiteThemeBaseId,
	SiteThemeChartId,
	SiteThemePaletteId,
	SiteThemeStyleId,
	ThemeConfig,
	ThemeLayers,
} from '@/types/site';

export const SITE_THEME_BASES = [
	'slate',
	'zinc',
	'neutral',
	'stone',
	'gray',
] as const satisfies readonly SiteThemeBaseId[];

export const SITE_THEME_ACCENTS = [
	'violet',
	'rose',
	'emerald',
	'yellow',
	'ocean',
	'sunset',
	'blue',
	'lime',
	'fuchsia',
] as const satisfies readonly SiteThemeAccentId[];

/** Те же идентификаторы, что у акцентной темы — в UI и в `chart.css`. */
export const SITE_THEME_CHARTS = SITE_THEME_ACCENTS;

export const SITE_THEME_STYLES = [
	'vega',
	'nova',
	'maia',
	'lyra',
	'mira',
	'luma',
] as const satisfies readonly SiteThemeStyleId[];

export const DEFAULT_THEME_LAYERS: Required<ThemeLayers> = {
	base: 'slate',
	accent: 'rose',
	chart: 'rose',
	style: 'lyra',
};

const baseSet = new Set<string>(SITE_THEME_BASES);
const accentSet = new Set<string>(SITE_THEME_ACCENTS);
const chartIdSet = new Set<string>(SITE_THEME_CHARTS);

function normalizeChartLayer(chart: SiteThemeChartId | string): SiteThemeChartId {
	if (chartIdSet.has(chart)) return chart as SiteThemeChartId;
	return DEFAULT_THEME_LAYERS.chart;
}

/**
 * Собирает слои темы: явный `themeLayers` или обратная совместимость по одной `palette`.
 */
export function resolveThemeLayers(theme: ThemeConfig): Required<ThemeLayers> {
	if (theme.themeLayers) {
		const tl = theme.themeLayers;
		return {
			base: tl.base,
			accent: tl.accent,
			chart: normalizeChartLayer(tl.chart),
			style: tl.style ?? DEFAULT_THEME_LAYERS.style,
		};
	}
	const p = (theme.palette ?? 'slate') as SiteThemePaletteId | string;
	if (baseSet.has(p)) {
		return {
			base: p as SiteThemeBaseId,
			accent: 'rose',
			chart: 'rose',
			style: DEFAULT_THEME_LAYERS.style,
		};
	}
	if (accentSet.has(p)) {
		return {
			base: 'slate',
			accent: p as SiteThemeAccentId,
			chart: p as SiteThemeChartId,
			style: DEFAULT_THEME_LAYERS.style,
		};
	}
	return DEFAULT_THEME_LAYERS;
}
