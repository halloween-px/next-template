export type ColorScheme = 'light' | 'dark';

/** Нейтраль из `src/styles/themes` (файл без `.css`). См. `kit/styles/registry`. */
export type SiteThemePaletteId =
	| 'slate'
	| 'zinc'
	| 'neutral'
	| 'stone'
	| 'gray'
	| 'violet'
	| 'rose'
	| 'emerald'
	| 'ocean'
	| 'sunset'
	| 'yellow';

/** Нейтральный слой (kit/styles/theme-layers/base.css). */
export type SiteThemeBaseId = 'slate' | 'zinc' | 'neutral' | 'stone' | 'gray';

/** Акцент / Theme (kit/styles/theme-layers/accent.css). */
export type SiteThemeAccentId =
	| 'violet'
	| 'rose'
	| 'emerald'
	| 'yellow'
	| 'ocean'
	| 'sunset'
	| 'blue'
	| 'lime'
	| 'fuchsia';

/** Палитра графиков — те же ключи, что у Theme (акцент); см. `theme-layers/chart.css`. */
export type SiteThemeChartId = SiteThemeAccentId;

/**
 * Геометрия и плотность: радиусы, отступы, бордеры (kit/styles/theme-layers/style.css).
 * Имена как в референсе UI (Vega … Luma).
 */
export type SiteThemeStyleId = 'vega' | 'nova' | 'maia' | 'lyra' | 'mira' | 'luma';

export interface ThemeLayers {
	base: SiteThemeBaseId;
	accent: SiteThemeAccentId;
	chart: SiteThemeChartId;
	/** Пресет «стиля»: радиусы, паддинги, толщина border — независимо от палитр. По умолчанию `lyra`. */
	style?: SiteThemeStyleId;
}

export interface ThemeConfig {
	colorScheme: ColorScheme;
	/**
	 * Масштаб типографики в превью и на сайте (1 = по умолчанию).
	 * Умножается с масштабом превью редактора; хранится в `config.theme`.
	 */
	textScale?: number;
	/** Слои как в shadcn: base + theme + chart (независимые оси). */
	themeLayers?: ThemeLayers;
	/** Устар.: одна палитра на всё; если нет `themeLayers`, собирается через `resolveThemeLayers`. */
	palette?: SiteThemePaletteId;
	primaryColor: string;
	accentColor: string;
	fonts: {
		heading: string;
		body: string;
	};
}
