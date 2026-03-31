'use client';

import { OpenBuilderPage } from '@/features/open-edit-page/open-edit-page';
import { OpenSitesPage } from '@/features/open-sites-page/open-sites-page';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function ProjectPreviewActions() {
	const { projectId } = useSiteProjectPreview();
	const { currentSlug } = useProjectPreviewRoute(projectId);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return createPortal(
		<div className='fixed left-4 bottom-4 z-[90] flex gap-2'>
			<OpenSitesPage />
			<OpenBuilderPage projectId={projectId} slug={currentSlug} mode='inline' />
		</div>,
		document.body
	);
}
