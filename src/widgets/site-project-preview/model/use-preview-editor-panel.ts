'use client';

import { usePreviewEditorPanelStore } from '@/stores/slices/preview-editor-panel-store';
import { useBuilderStore } from '@/stores/slices/site-store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const EDITOR_PANEL_WIDTH_PX = 360;
export const THEME_PANEL_WIDTH_PX = 320;
const CLOSE_ANIMATION_MS = 200;

export function usePreviewEditorPanel() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const clearActiveSection = useBuilderStore((s) => s.clearActiveSection);

	const editorQueryEnabled = searchParams.get('editor') === '1';
	const [editorOpen, setEditorOpen] = useState(editorQueryEnabled);
	const themePanelOpen = usePreviewEditorPanelStore((s) => s.themePanelOpen);
	const uiToolkitCanvas = usePreviewEditorPanelStore((s) => s.uiToolkitCanvas);
	const openThemePanelStore = usePreviewEditorPanelStore((s) => s.openThemePanel);
	const closeThemePanelStore = usePreviewEditorPanelStore((s) => s.closeThemePanel);
	const toggleUiToolkitCanvasStore = usePreviewEditorPanelStore((s) => s.toggleUiToolkitCanvas);
	const closeUiToolkitCanvasStore = usePreviewEditorPanelStore((s) => s.closeUiToolkitCanvas);
	const resetPreviewEditorUi = usePreviewEditorPanelStore((s) => s.resetPreviewEditorUi);
	const [viewportWidth, setViewportWidth] = useState<number>(0);

	useEffect(() => {
		setEditorOpen(editorQueryEnabled);
		if (!editorQueryEnabled) {
			resetPreviewEditorUi();
		}
	}, [editorQueryEnabled, resetPreviewEditorUi]);

	useEffect(() => {
		const update = () => setViewportWidth(window.innerWidth || 0);
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	const editorPanelVisible = editorOpen && !themePanelOpen;

	const activeSidebarWidthPx = useMemo(() => {
		if (themePanelOpen) return THEME_PANEL_WIDTH_PX;
		if (editorPanelVisible) return EDITOR_PANEL_WIDTH_PX;
		return 0;
	}, [themePanelOpen, editorPanelVisible]);

	const scale = useMemo(() => {
		if (!activeSidebarWidthPx) return 1;
		if (!viewportWidth) return 1;
		const raw = (viewportWidth - activeSidebarWidthPx) / viewportWidth;
		return Math.max(0.6, Math.min(1, raw));
	}, [activeSidebarWidthPx, viewportWidth]);

	const openThemePanel = useCallback(() => {
		openThemePanelStore();
	}, [openThemePanelStore]);

	const closeThemePanel = useCallback(() => {
		closeThemePanelStore();
	}, [closeThemePanelStore]);

	const toggleUiToolkitCanvas = useCallback(() => {
		toggleUiToolkitCanvasStore();
	}, [toggleUiToolkitCanvasStore]);

	const closeUiToolkitCanvas = useCallback(() => {
		closeUiToolkitCanvasStore();
	}, [closeUiToolkitCanvasStore]);

	const closeEditor = () => {
		resetPreviewEditorUi();
		setEditorOpen(false);
		clearActiveSection();
		window.setTimeout(() => {
			const next = new URLSearchParams(searchParams.toString());
			next.delete('editor');
			const query = next.toString();
			router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
		}, CLOSE_ANIMATION_MS);
	};

	return {
		editorOpen,
		editorPanelVisible,
		themePanelOpen,
		uiToolkitCanvas,
		openThemePanel,
		toggleUiToolkitCanvas,
		closeUiToolkitCanvas,
		closeThemePanel,
		resetPreviewEditorUi,
		closeEditor,
		scale,
		editorPanelWidthPx: EDITOR_PANEL_WIDTH_PX,
		themePanelWidthPx: THEME_PANEL_WIDTH_PX,
		activeSidebarWidthPx,
	};
}
