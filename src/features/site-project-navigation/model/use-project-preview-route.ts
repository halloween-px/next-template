'use client';

import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { usePathname, useSearchParams } from 'next/navigation';

export function useProjectPreviewRoute(projectId: string) {
	const pathname = usePathname() ?? '';
	const queryParams = useSearchParams();
	const { config } = useSiteProjectPreview();

	const projectBase = `/template/project/${projectId}`;
	const rest = pathname.startsWith(projectBase) ? pathname.slice(projectBase.length) || '/' : '/';
	const currentSlug = rest === '' ? '/' : rest;
	const isHome = currentSlug === '/';
	const currentPage = config.pages.find((page) => page.slug === currentSlug);
	const isEditing = queryParams.get('editor') === '1';

	return {
		config,
		projectBase,
		currentSlug,
		isHome,
		currentPage,
		isEditing,
	};
}
