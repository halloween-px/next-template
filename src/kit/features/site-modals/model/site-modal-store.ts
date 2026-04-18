'use client';

import type { SiteModalId } from '../config/site-modals-registry';
import { create } from 'zustand';

type SiteModalState = {
	openId: SiteModalId | null;
	openSiteModal: (id: SiteModalId) => void;
	closeSiteModal: () => void;
};

export const useSiteModalStore = create<SiteModalState>((set) => ({
	openId: null,
	openSiteModal: (id) => set({ openId: id }),
	closeSiteModal: () => set({ openId: null }),
}));

export function openSiteModal(id: SiteModalId) {
	useSiteModalStore.getState().openSiteModal(id);
}

export function closeSiteModal() {
	useSiteModalStore.getState().closeSiteModal();
}
