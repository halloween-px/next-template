import type { SiteThemeAccentId } from '@/types/site';

/** Превью-цвет в селектах Theme / Chart (Tailwind). */
export const THEME_ACCENT_SWATCH_CLASSES: Record<SiteThemeAccentId, string> = {
	violet: 'bg-violet-500 dark:bg-violet-400',
	rose: 'bg-rose-500 dark:bg-rose-400',
	emerald: 'bg-emerald-500 dark:bg-emerald-400',
	yellow: 'bg-yellow-400 dark:bg-yellow-300',
	ocean: 'bg-sky-600 dark:bg-sky-400',
	sunset: 'bg-orange-500 dark:bg-orange-400',
	blue: 'bg-blue-500 dark:bg-blue-400',
	lime: 'bg-lime-500 dark:bg-lime-400',
	fuchsia: 'bg-fuchsia-500 dark:bg-fuchsia-400',
};
