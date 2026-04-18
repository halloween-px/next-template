'use client';

import { ShowActiveBlock } from '@/features/site-project-preview/show-active-block';
import SectionRenderer from '@/core/renderer';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { ProjectBreadcrumbs } from '@/features/site-project-navigation/ui/project-breadcrumbs';
import type { Block } from '@/types/site';
import type { ReactNode } from 'react';

type Props = {
	projectId: string;
	children: ReactNode;
};

/** Контент превью «как сайт»: header из конфига, хлебные крошки, страница, footer. */
export function SiteProjectPreviewSiteChrome({ projectId, children }: Props) {
	const { config, projectBase, currentSlug, isHome, currentPage } = useProjectPreviewRoute(projectId);

	return (
		<>
			{config.header ? (
				<ShowActiveBlock sectionId={config.header.id} variant='header'>
					<SectionRenderer
						section={config.header as Block}
						siteNavigation={config.navigation}
						companyInfo={config.companyInfo}
					/>
				</ShowActiveBlock>
			) : null}

			{!isHome ? (
				<ProjectBreadcrumbs
					homeLink={projectBase}
					currentSlug={currentSlug}
					currentPageName={currentPage?.name}
				/>
			) : null}

			{children}

			<SectionRenderer section={config.footer} />
		</>
	);
}
