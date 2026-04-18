import '@/kit/styles/site-theme-layers.css';

import { resolveThemeLayers } from '@/kit/styles/registry';
import type { ThemeConfig } from '@/types/site';

/**
 * Подставляет primaryColor / accentColor из тех же CSS-переменных, что и превью лаборатории:
 * --primary слоя акцента и --chart-1 слоя графиков (светлая/тёмная схема).
 */
export function withCapturedSemanticColors(theme: ThemeConfig): ThemeConfig {
	if (typeof document === 'undefined') {
		return theme;
	}

	const layers = resolveThemeLayers(theme);
	const el = document.createElement('div');
	el.setAttribute('data-site-base', layers.base);
	el.setAttribute('data-site-accent', layers.accent);
	el.setAttribute('data-site-chart', layers.chart);
	el.setAttribute('data-site-style', layers.style ?? 'lyra');
	if (theme.colorScheme === 'dark') {
		el.classList.add('dark');
	}
	el.style.cssText =
		'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;contain:strict';
	document.body.appendChild(el);

	const styles = getComputedStyle(el);
	let primary = styles.getPropertyValue('--primary').trim();
	let accent = styles.getPropertyValue('--chart-1').trim();

	document.body.removeChild(el);

	if (!primary) primary = theme.primaryColor;
	if (!accent) accent = theme.accentColor;

	return {
		...theme,
		primaryColor: primary,
		accentColor: accent,
	};
}
