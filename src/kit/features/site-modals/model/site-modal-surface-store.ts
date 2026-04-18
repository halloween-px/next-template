'use client';

import { create } from 'zustand';

/**
 * Поверхность превью билдера («сайт» с data-site-* и локальным dark).
 * Диалог порталится в `body`, поэтому без синхронизации тема модалки не совпадает с превью.
 */
export type SiteModalSurfaceSnapshot = {
	contentClassName: string;
	overlayClassName: string;
	'data-site-base': string;
	'data-site-accent': string;
	'data-site-chart': string;
	'data-site-style': string;
	fontFamily?: string;
};

type State = {
	snapshot: SiteModalSurfaceSnapshot | null;
	setSiteModalSurfaceSnapshot: (snapshot: SiteModalSurfaceSnapshot | null) => void;
};

export const useSiteModalSurfaceStore = create<State>((set) => ({
	snapshot: null,
	setSiteModalSurfaceSnapshot: (snapshot) => set({ snapshot }),
}));
