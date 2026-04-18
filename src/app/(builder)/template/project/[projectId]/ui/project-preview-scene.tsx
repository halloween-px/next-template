'use client';

import { SiteProjectPreviewProvider } from '@/providers/site-project-preview-provider';
import { SiteProjectThemeCustomizeProvider } from '@/providers/site-project-theme-customize-provider';
import { useBuilderStore } from '@/stores/slices/site-store';
import type { SiteConfig } from '@/types/site';
import { SiteProjectEditorPanel } from '@/widgets/site-project-editor/site-project-editor-panel';
import { SiteProjectThemePanel } from '@/widgets/site-project-editor/site-project-theme-panel';
import { SiteProjectUiToolkitCanvas } from '@/widgets/site-project-editor/site-project-ui-toolkit-canvas';
import { usePreviewEditorPanel } from '@/widgets/site-project-preview/model/use-preview-editor-panel';
import { ProjectPreviewActions } from '@/widgets/site-project-preview/ui/project-preview-actions';
import { SiteProjectPreviewFrame } from '@/widgets/site-project-preview/ui/site-project-preview-frame';
import { useLayoutEffect, type ReactNode } from 'react';

type Props = {
	config: SiteConfig;
	projectId: string;
	children: ReactNode;
};

export function ProjectPreviewScene({ config, projectId, children }: Props) {
	const {
		editorOpen,
		editorPanelVisible,
		uiToolkitCanvas,
		themePanelOpen,
		resetPreviewEditorUi,
		closeEditor,
		closeThemePanel,
		scale,
		editorPanelWidthPx,
		themePanelWidthPx,
	} = usePreviewEditorPanel();
	const setSection = useBuilderStore((s) => s.setSection);
	const sections = useBuilderStore((s) => s.sections);

	/** Гидрация стора из конфига проекта — только при смене проекта/конфига, не при каждом изменении `sections`. */
	useLayoutEffect(() => {
		setSection(config.pages[0].sections);
	}, [config, projectId, setSection]);

	useLayoutEffect(() => {
		resetPreviewEditorUi();
	}, [projectId, resetPreviewEditorUi]);

	if (!sections) return null;

	const uiToolkitSlot = uiToolkitCanvas && editorOpen ? <SiteProjectUiToolkitCanvas /> : undefined;

	return (
		<SiteProjectPreviewProvider config={config} projectId={projectId}>
			<SiteProjectThemeCustomizeProvider>
				<SiteProjectPreviewFrame
					projectId={projectId}
					editorPanelVisible={editorPanelVisible}
					rightPanelOpen={themePanelOpen && editorOpen}
					editorPanelWidthPx={editorPanelWidthPx}
					rightDockWidthPx={themePanelWidthPx}
					scale={scale}
					editorPanel={<SiteProjectEditorPanel isOpen={editorPanelVisible} onClose={closeEditor} />}
					rightDock={
						<SiteProjectThemePanel
							isOpen={themePanelOpen && editorOpen}
							panelWidthPx={themePanelWidthPx}
							onClose={closeThemePanel}
						/>
					}
					uiToolkitCanvas={uiToolkitSlot}
					floatingActions={<ProjectPreviewActions />}>
					{children}
				</SiteProjectPreviewFrame>
			</SiteProjectThemeCustomizeProvider>
		</SiteProjectPreviewProvider>
	);
}
