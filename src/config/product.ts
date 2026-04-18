/** Публичное имя продукта (маркетинг, шапка, метаданные). */
export const PRODUCT_NAME = 'Поток';

/** Строки слогана для лого в шапке (перенос после «блока»). */
export const PRODUCT_TAGLINE_LINES = ['Один поток от блока', 'до готового вида.'] as const;

/** Полный слоган для метаданных и текстов без переноса. */
export const PRODUCT_TAGLINE = `${PRODUCT_TAGLINE_LINES[0]} ${PRODUCT_TAGLINE_LINES[1]}`;

/** Заголовок вкладки для внутренних страниц: «Раздел — Поток». */
export function productPageTitle(pageTitle: string) {
	return `${pageTitle} — ${PRODUCT_NAME}`;
}
