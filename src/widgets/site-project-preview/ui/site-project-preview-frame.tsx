'use client';

import SectionRenderer from '@/core/renderer';
import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { ProjectBreadcrumbs } from '@/features/site-project-navigation/ui/project-breadcrumbs';
import { TemplateLayout } from '@/kit/components/layouts/template-layout/template-layout';
import type { ReactNode } from 'react';
import { usePreviewEditorPanel } from '../model/use-preview-editor-panel';

type Props = {
	projectId: string;
	children: ReactNode;
};

export function SiteProjectPreviewFrame({ projectId, children }: Props) {
	const { config, projectBase, currentSlug, isHome, currentPage } = useProjectPreviewRoute(projectId);
	const { editorOpen, scale, panelWidth, closeEditor } = usePreviewEditorPanel();

	return (
		<TemplateLayout>
			<div className='relative min-h-screen overflow-hidden'>
				<aside
					className={
						'fixed left-0 top-0 z-30 h-screen w-[360px] border-r border-white/10 bg-neutral-950/95 backdrop-blur ' +
						'transition-transform duration-[220ms] will-change-transform ' +
						(editorOpen ? 'translate-x-0' : '-translate-x-[360px]')
					}>
					<div className='flex items-center justify-between p-4'>
						<div className='font-semibold'>Редактирование</div>
						<button
							type='button'
							onClick={closeEditor}
							className='rounded-md px-2 py-1 text-sm opacity-80 hover:opacity-100'>
							Закрыть
						</button>
					</div>
					<div className='p-4 text-sm opacity-85'>Тут будут настройки блоков текущей страницы.</div>
				</aside>

				<div
					className='relative z-10 min-w-0 origin-top-left transition-all'
					style={{
						width: editorOpen ? `calc(100vw - ${panelWidth}px)` : '100vw',
						transform: editorOpen ? `translateX(${panelWidth}px)` : 'translateX(0px) scale(1)',
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
