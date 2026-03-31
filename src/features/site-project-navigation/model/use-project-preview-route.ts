'use client';

import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { usePathname } from 'next/navigation';

export function useProjectPreviewRoute(projectId: string) {
	const pathname = usePathname() ?? '';
	const { config } = useSiteProjectPreview();

	const projectBase = `/template/project/${projectId}`;
	const rest = pathname.startsWith(projectBase) ? pathname.slice(projectBase.length) || '/' : '/';
	const currentSlug = rest === '' ? '/' : rest;
	const isHome = currentSlug === '/';
	const currentPage = config.pages.find((page) => page.slug === currentSlug);

	return {
		config,
		projectBase,
		currentSlug,
		isHome,
		currentPage,
	};
}
