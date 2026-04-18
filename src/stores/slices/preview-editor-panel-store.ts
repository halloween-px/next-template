import { create } from 'zustand';

type PreviewEditorPanelState = {
	/** Правая панель «Оформление сайта» — при открытии левая колонка редактора скрыта. */
	themePanelOpen: boolean;
	/** Центральная область превью: сайт или лаборатория «Мелкий UI» (левая колонка остаётся). */
	uiToolkitCanvas: boolean;
	openThemePanel: () => void;
	closeThemePanel: () => void;
	toggleUiToolkitCanvas: () => void;
	closeUiToolkitCanvas: () => void;
	/** Сброс при смене проекта / выходе из редактора. */
	resetPreviewEditorUi: () => void;
};

export const usePreviewEditorPanelStore = create<PreviewEditorPanelState>((set) => ({
	themePanelOpen: false,
	uiToolkitCanvas: false,
	openThemePanel: () => set({ themePanelOpen: true, uiToolkitCanvas: false }),
	closeThemePanel: () => set({ themePanelOpen: false }),
	toggleUiToolkitCanvas: () =>
		set((s) =>
			s.uiToolkitCanvas
				? { uiToolkitCanvas: false }
				: { uiToolkitCanvas: true, themePanelOpen: false },
		),
	closeUiToolkitCanvas: () => set({ uiToolkitCanvas: false }),
	resetPreviewEditorUi: () => set({ themePanelOpen: false, uiToolkitCanvas: false }),
}));
