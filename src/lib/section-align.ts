import type { SectionTextAlign } from '@/types/section-layout';

const DEFAULT_ALIGN: SectionTextAlign = 'center';

/**
 * Читает `sectionTitleAlign` / `sectionBodyAlign` из контента блока.
 * По умолчанию — центр (как у `SectionTitle` в kit).
 */
export function resolveSectionAlignFromContent(content: unknown): {
	sectionTitleAlign: SectionTextAlign;
	sectionBodyAlign: SectionTextAlign;
} {
	const c =
		content && typeof content === 'object'
			? (content as Record<string, unknown>)
			: {};
	const ta = c.sectionTitleAlign as SectionTextAlign | undefined;
	const ba = c.sectionBodyAlign as SectionTextAlign | undefined;
	const sectionTitleAlign = ta ?? DEFAULT_ALIGN;
	const sectionBodyAlign = ba ?? ta ?? DEFAULT_ALIGN;
	return { sectionTitleAlign, sectionBodyAlign };
}

/** Для `flex` / категорий под заголовком */
export function flexJustifyFromAlign(align: SectionTextAlign): string {
	switch (align) {
		case 'left':
			return 'justify-start';
		case 'right':
			return 'justify-end';
		default:
			return 'justify-center';
	}
}

/** Для блоков с `max-w-*`: сдвиг влево / центр / вправо внутри контейнера */
export function marginInlineAutoFromAlign(align: SectionTextAlign): string {
	switch (align) {
		case 'left':
			return 'ms-0 me-auto';
		case 'right':
			return 'ms-auto me-0';
		default:
			return 'mx-auto';
	}
}
