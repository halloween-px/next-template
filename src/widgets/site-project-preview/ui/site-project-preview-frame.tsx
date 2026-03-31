'use client';

import SectionRenderer from '@/core/renderer';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { ProjectBreadcrumbs } from '@/features/site-project-navigation/ui/project-breadcrumbs';
import { TemplateLayout } from '@/kit/components/layouts/template-layout/template-layout';
import type { ReactNode } from 'react';

type Props = {
	projectId: string;
	isEditorOpen: boolean;
	panelWidth: number;
	scale: number;
	editorPanel?: ReactNode;
	children: ReactNode;
};

export function SiteProjectPreviewFrame({
	projectId,
	isEditorOpen,
	panelWidth,
	scale,
	editorPanel,
	children,
}: Props) {
	const { config, projectBase, currentSlug, isHome, currentPage } = useProjectPreviewRoute(projectId);

	return (
		<TemplateLayout>
			<div className='relative min-h-screen overflow-hidden'>
				{editorPanel}

				<div
					className='relative z-10 min-w-0 origin-top-left transition-all'
					style={{
						width: isEditorOpen ? `calc(100vw - ${panelWidth}px)` : '100vw',
						transform: isEditorOpen ? `translateX(${panelWidth}px)` : 'translateX(0px) scale(1)',
					}}>
					<div style={{ zoom: scale }}>
						{config.header ? (
							<SectionRenderer section={config.header} siteNavigation={config.navigation} />
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
					</div>
				</div>
			</div>
		</TemplateLayout>
	);
}
