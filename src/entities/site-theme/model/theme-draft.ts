import type { SiteThemeBaseId, SiteThemeStyleId, ThemeConfig } from '@/types/site';

/** Черновик темы в мастере создания (Style Lab). Расширяется без ломки ThemeConfig. */
export type ThemeDraft = {
	mode: 'light' | 'dark' | 'system';
	primary: string;
	accent: string;
	neutral: SiteThemeBaseId;
	radius: 'sm' | 'md' | 'lg';
	fontHeading: string;
	fontBody: string;
	density: 'comfortable' | 'compact';
};

const RADIUS_TO_STYLE: Record<ThemeDraft['radius'], SiteThemeStyleId> = {
	sm: 'vega',
	md: 'lyra',
	lg: 'luma',
};

export const DEFAULT_THEME_DRAFT: ThemeDraft = {
	mode: 'light',
	primary: '#4f46e5',
	accent: '#06b6d4',
	neutral: 'slate',
	radius: 'md',
	fontHeading: 'Inter',
	fontBody: 'Inter',
	density: 'comfortable',
};

/** В ThemeConfig пока храним только то, что уже есть в схеме сайта. */
export function themeDraftToThemeConfig(draft: ThemeDraft): ThemeConfig {
	const colorScheme =
		draft.mode === 'system' ? 'light' : draft.mode === 'dark' ? 'dark' : 'light';

	return {
		colorScheme,
		palette: draft.neutral,
		themeLayers: {
			base: draft.neutral,
			accent: 'rose',
			chart: 'rose',
			style: RADIUS_TO_STYLE[draft.radius],
		},
		primaryColor: draft.primary,
		accentColor: draft.accent,
		fonts: {
			heading: draft.fontHeading,
			body: draft.fontBody,
		},
	};
}
