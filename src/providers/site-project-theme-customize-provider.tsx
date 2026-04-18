'use client';

import '@/kit/styles/site-theme-layers.css';
import { resolveThemeLayers } from '@/kit/styles/registry';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import type { ThemeConfig } from '@/types/site';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type SiteProjectThemeCustomizeValue = {
	theme: ThemeConfig;
	setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
	layers: ReturnType<typeof resolveThemeLayers>;
	resetTheme: () => void;
};

const SiteProjectThemeCustomizeContext = createContext<SiteProjectThemeCustomizeValue | null>(null);

export function SiteProjectThemeCustomizeProvider({ children }: { children: ReactNode }) {
	const { config } = useSiteProjectPreview();
	const [theme, setTheme] = useState<ThemeConfig>(() => config.theme);

	useEffect(() => {
		setTheme(config.theme);
	}, [config]);

	const layers = useMemo(() => resolveThemeLayers(theme), [theme]);

	const resetTheme = useCallback(() => {
		setTheme(config.theme);
	}, [config]);

	const value = useMemo(
		() => ({ theme, setTheme, layers, resetTheme }),
		[theme, layers, resetTheme]
	);

	return (
		<SiteProjectThemeCustomizeContext.Provider value={value}>{children}</SiteProjectThemeCustomizeContext.Provider>
	);
}

export function useSiteProjectThemeCustomize() {
	const ctx = useContext(SiteProjectThemeCustomizeContext);
	if (!ctx) {
		throw new Error('useSiteProjectThemeCustomize: только внутри SiteProjectThemeCustomizeProvider');
	}
	return ctx;
}
