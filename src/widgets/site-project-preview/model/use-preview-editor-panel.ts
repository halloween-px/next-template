'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const PANEL_WIDTH = 360;
const CLOSE_ANIMATION_MS = 220;

export function usePreviewEditorPanel() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const editorQueryEnabled = searchParams.get('editor') === '1';
	const [editorOpen, setEditorOpen] = useState(editorQueryEnabled);
	const [viewportWidth, setViewportWidth] = useState<number>(0);

	useEffect(() => {
		setEditorOpen(editorQueryEnabled);
	}, [editorQueryEnabled]);

	useEffect(() => {
		const update = () => setViewportWidth(window.innerWidth || 0);
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	const scale = useMemo(() => {
		if (!editorOpen) return 1;
		if (!viewportWidth) return 1;
		const raw = (viewportWidth - PANEL_WIDTH) / viewportWidth;
		return Math.max(0.6, Math.min(1, raw));
	}, [editorOpen, viewportWidth]);

	const closeEditor = () => {
		setEditorOpen(false);
		window.setTimeout(() => {
			const next = new URLSearchParams(searchParams.toString());
			next.delete('editor');
			const query = next.toString();
			router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
		}, CLOSE_ANIMATION_MS);
	};

	return {
		editorOpen,
		scale,
		panelWidth: PANEL_WIDTH,
		closeEditor,
	};
}
