/** Отступ от верха вьюпорта при автоскролле к блоку после смены варианта в редакторе. */
export const BUILDER_SECTION_SCROLL_TOP_OFFSET_PX = 300;

/**
 * Плавный скролл к обёртке блока (`data-builder-section`) с отступом сверху.
 * Вызывать после обновления DOM (например в двойном rAF после `changeBlockType`).
 */
export function scrollToBuilderSection(
	sectionId: string,
	offsetPx: number = BUILDER_SECTION_SCROLL_TOP_OFFSET_PX,
): void {
	if (typeof document === 'undefined') return;

	const el = document.querySelector<HTMLElement>(`[data-builder-section="${sectionId}"]`);
	if (!el) return;

	const rect = el.getBoundingClientRect();
	const nextTop = window.scrollY + rect.top - offsetPx;
	window.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' });
}
