'use client';

import SectionRenderer from '@/core/renderer';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { OpenBuilderPage } from '@/features/open-edit-page/open-edit-page';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { OpenSitesPage } from '@/features/open-sites-page/open-sites-page';

export default function TemplateProjectPreviewPage() {
	const { projectId } = useSiteProjectPreview();
	const { currentPage } = useProjectPreviewRoute(projectId);
	const sections = currentPage?.sections;

	return (
		<div className='relative'>
			{sections?.map((section) => (
				<SectionRenderer section={section} key={section.id} />
			))}
		</div>
	);
}
