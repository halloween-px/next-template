'use client';

import { SiteProjectPreviewProvider } from '@/providers/site-project-preview-provider';
import type { SiteConfig } from '@/types/site';
import type { ReactNode } from 'react';
import { SiteProjectPreviewFrame } from './site-project-preview-frame';

type Props = {
	config: SiteConfig;
	projectId: string;
	children: ReactNode;
};

export function SiteProjectPreviewShell({ config, projectId, children }: Props) {
	return (
		<SiteProjectPreviewProvider config={config} projectId={projectId}>
			<SiteProjectPreviewFrame projectId={projectId}>{children}</SiteProjectPreviewFrame>
		</SiteProjectPreviewProvider>
	);
}
