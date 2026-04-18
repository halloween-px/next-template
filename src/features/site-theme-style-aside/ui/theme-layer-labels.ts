import type {
	SiteThemeAccentId,
	SiteThemeBaseId,
	SiteThemeChartId,
	SiteThemeStyleId,
} from '@/types/site';

/** Подписи нейтральной гаммы в селекте (значения остаются латиницей для конфига). */
export const BASE_LAYER_LABELS: Record<SiteThemeBaseId, string> = {
	slate: 'Сланец',
	zinc: 'Цинк',
	neutral: 'Нейтральный',
	stone: 'Камень',
	gray: 'Серый',
};

export const ACCENT_LAYER_LABELS: Record<SiteThemeAccentId, string> = {
	violet: 'Фиолетовый',
	rose: 'Розовый',
	emerald: 'Изумрудный',
	yellow: 'Жёлтый',
	ocean: 'Океан',
	sunset: 'Закат',
	blue: 'Синий',
	lime: 'Лайм',
	fuchsia: 'Фуксия',
};

export const CHART_LAYER_LABELS = ACCENT_LAYER_LABELS as Record<SiteThemeChartId, string>;

/** Имена пресетов плотности/формы (транслитерация узнаваемых имён). */
export const STYLE_LAYER_LABELS: Record<SiteThemeStyleId, string> = {
	vega: 'Вега',
	nova: 'Нова',
	maia: 'Майя',
	lyra: 'Лира',
	mira: 'Мира',
	luma: 'Люма',
};
