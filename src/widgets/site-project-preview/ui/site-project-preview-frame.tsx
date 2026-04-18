'use client';

import { SyncSiteModalSurface } from '@/kit/features/site-modals/ui/sync-site-modal-surface';
import { TemplateLayout } from '@/kit/components/layouts/template-layout/template-layout';
import { useSiteProjectThemeCustomize } from '@/providers/site-project-theme-customize-provider';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

import { SiteProjectPreviewSiteChrome } from './site-project-preview-site-chrome';

type Props = {
	projectId: string;
	editorPanelVisible: boolean;
	rightPanelOpen: boolean;
	editorPanelWidthPx: number;
	rightDockWidthPx: number;
	scale: number;
	editorPanel?: ReactNode;
	rightDock?: ReactNode;
	floatingActions?: ReactNode;
	/** Вместо страницы сайта — лаборатория UI (без header/footer из конфига страницы). */
	uiToolkitCanvas?: ReactNode;
	children: ReactNode;
};

export function SiteProjectPreviewFrame({
	projectId,
	editorPanelVisible,
	rightPanelOpen,
	editorPanelWidthPx,
	rightDockWidthPx,
	scale,
	editorPanel,
	rightDock,
	floatingActions,
	uiToolkitCanvas,
	children,
}: Props) {
	const { theme, layers } = useSiteProjectThemeCustomize();
	const schemeClass = theme.colorScheme === 'dark' ? 'dark' : undefined;

	const marginLeft = editorPanelVisible ? editorPanelWidthPx : 0;
	const marginRight = rightPanelOpen ? rightDockWidthPx : 0;
	const contentWidth = `calc(100vw - ${marginLeft + marginRight}px)`;
	const fabInset = 16;

	const showUiLab = Boolean(uiToolkitCanvas);
	const textScale = theme.textScale ?? 1;
	const previewZoom = scale * textScale;

	return (
		<TemplateLayout>
			<SyncSiteModalSurface />
			<div className='relative min-h-screen overflow-x-visible'>
				{editorPanel}
				{rightDock}

				<div
					className='relative z-10 min-w-0 origin-top-left transition-[margin,width] duration-200 ease-out'
					style={{
						width: contentWidth,
						marginLeft,
						marginRight,
					}}>
					<div
						className='min-w-0 overflow-visible'
						style={previewZoom !== 1 ? { zoom: previewZoom } : undefined}>
						<div
							data-site-base={layers.base}
							data-site-accent={layers.accent}
							data-site-chart={layers.chart}
							data-site-style={layers.style}
							className={cn('min-w-0 bg-background text-foreground', schemeClass)}
							style={{ fontFamily: `${theme.fonts.body}, system-ui, sans-serif` }}>
							{showUiLab ? (
								uiToolkitCanvas
							) : (
								<SiteProjectPreviewSiteChrome projectId={projectId}>{children}</SiteProjectPreviewSiteChrome>
							)}
						</div>
					</div>
				</div>

				{floatingActions ? (
					<div
						className='pointer-events-none fixed z-90 transition-[left,max-width] duration-200 ease-out'
						style={{
							left: marginLeft + fabInset,
							bottom: fabInset,
							maxWidth: `calc(100vw - ${marginLeft + marginRight + fabInset * 2}px)`,
						}}>
						<div className='pointer-events-auto'>{floatingActions}</div>
					</div>
				) : null}
			</div>
		</TemplateLayout>
	);
}
