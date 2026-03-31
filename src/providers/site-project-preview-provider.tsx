'use client';

/**
 * Контекст превью сохранённого сайта (маршрут /template/project/[projectId]).
 * Не относится к kit — лежит в корневом `providers` приложения.
 */
import type { SiteConfig } from '@/types/site';
import { createContext, useContext, type ReactNode } from 'react';

type SiteProjectPreviewValue = {
	config: SiteConfig;
	projectId: string;
};

const SiteProjectPreviewContext = createContext<SiteProjectPreviewValue | null>(null);

export function SiteProjectPreviewProvider({
	config,
	projectId,
	children,
}: {
	config: SiteConfig;
	projectId: string;
	children: ReactNode;
}) {
	return (
		<SiteProjectPreviewContext.Provider value={{ config, projectId }}>
			{children}
		</SiteProjectPreviewContext.Provider>
	);
}

export function useSiteProjectPreview() {
	const ctx = useContext(SiteProjectPreviewContext);
	if (!ctx) {
		throw new Error('useSiteProjectPreview: только внутри SiteProjectPreviewProvider');
	}
	return ctx;
}
