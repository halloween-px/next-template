'use client';

import { SiteProjectPreviewProvider } from '@/providers/site-project-preview-provider';
import type { SiteConfig } from '@/types/site';
import { SiteProjectEditorPanel } from '@/widgets/site-project-editor/ui/site-project-editor-panel';
import { usePreviewEditorPanel } from '@/widgets/site-project-preview/model/use-preview-editor-panel';
import { SiteProjectPreviewFrame } from '@/widgets/site-project-preview/ui/site-project-preview-frame';
import type { ReactNode } from 'react';

type Props = {
	config: SiteConfig;
	projectId: string;
	children: ReactNode;
};

export function ProjectPreviewScene({ config, projectId, children }: Props) {
	const { editorOpen, scale, panelWidth, closeEditor } = usePreviewEditorPanel();

	return (
		<SiteProjectPreviewProvider config={config} projectId={projectId}>
			<SiteProjectPreviewFrame
				projectId={projectId}
				isEditorOpen={editorOpen}
				panelWidth={panelWidth}
				scale={scale}
				editorPanel={<SiteProjectEditorPanel isOpen={editorOpen} onClose={closeEditor} />}>
				{children}
			</SiteProjectPreviewFrame>
		</SiteProjectPreviewProvider>
	);
}
