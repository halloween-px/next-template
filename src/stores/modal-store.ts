import { MODALS_CONFIG } from '@/config/modals-config';
import { create } from 'zustand';

export type ModalId = 'createSiteProject';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

type ModalConfig = {
	id: ModalId;
	title: string;
	description: string;
	component: React.ComponentType;
	size?: ModalSize;
};

type State = {
	modals: ModalConfig[];
};

/** Поля из конфига, которые можно переопределить при открытии (без `id` и `component`). */
export type ModalOpenOverrides = Partial<Pick<ModalConfig, 'title' | 'description' | 'size'>>;

type Actions = {
	openModal: (id: ModalId, overrides?: ModalOpenOverrides) => void;
	closeModal: (id: ModalId) => void;
	closeAllModals: () => void;
};

export const useModalStore = create<State & Actions>((set) => ({
	modals: [],

	openModal: (id, overrides) =>
		set({
			modals: [{ ...MODALS_CONFIG[id], ...overrides }],
		}),
	closeModal: (id) => set((s) => ({ modals: s.modals.filter((m) => m.id !== id) })),
	closeAllModals: () => set({ modals: [] }),
}));

export function openCreateSiteProjectModal() {
	useModalStore.getState().openModal('createSiteProject');
}
