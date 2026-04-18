'use client';

import SectionRenderer from '@/core/renderer';
import { ShowActiveBlock } from '@/features/site-project-preview/show-active-block';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { useBuilderStore } from '@/stores/slices/site-store';

export default function TemplateProjectPreviewPage() {
	const { projectId } = useSiteProjectPreview();
	const { currentPage, config, isEditing } = useProjectPreviewRoute(projectId);
	const storeSections = useBuilderStore((s) => s.sections);

	const firstPage = config.pages[0];
	const isFirstPage = Boolean(firstPage && currentPage && currentPage.id === firstPage.id);

	const sections = isFirstPage && storeSections ? storeSections : currentPage?.sections;

	return (
		<div className='relative'>
			{sections?.map((section) =>
				isEditing ? (
					<ShowActiveBlock sectionId={section.id} key={section.id}>
						<SectionRenderer section={section} siteUiKit={config.uiKit} key={section.id} />
					</ShowActiveBlock>
				) : (
					<div key={section.id}>
						<SectionRenderer section={section} siteUiKit={config.uiKit} key={section.id} />
					</div>
				)
			)}
		</div>
	);
}
