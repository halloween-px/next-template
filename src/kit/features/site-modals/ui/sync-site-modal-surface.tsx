'use client';

import { useSiteProjectThemeCustomize } from '@/providers/site-project-theme-customize-provider';
import { cn } from '@/lib/utils';
import { useSiteModalSurfaceStore } from '../model/site-modal-surface-store';
import { useEffect } from 'react';

/** Пишет в стор палитру/шрифт превью, чтобы `SiteModalProvider` совпадал с колонкой сайта. */
export function SyncSiteModalSurface() {
	const { theme, layers } = useSiteProjectThemeCustomize();
	const schemeClass = theme.colorScheme === 'dark' ? 'dark' : undefined;
	const setSnapshot = useSiteModalSurfaceStore((s) => s.setSiteModalSurfaceSnapshot);

	useEffect(() => {
		setSnapshot({
			contentClassName: cn('bg-background text-foreground antialiased', schemeClass),
			overlayClassName:
				'bg-black/40 backdrop-blur-md supports-[backdrop-filter]:bg-black/35 dark:bg-black/55',
			'data-site-base': layers.base,
			'data-site-accent': layers.accent,
			'data-site-chart': layers.chart,
			'data-site-style': layers.style,
			fontFamily: `${theme.fonts.body}, system-ui, sans-serif`,
		});
		return () => setSnapshot(null);
	}, [
		layers.accent,
		layers.base,
		layers.chart,
		layers.style,
		schemeClass,
		setSnapshot,
		theme.fonts.body,
	]);

	return null;
}
