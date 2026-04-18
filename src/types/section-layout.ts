/** Общие опции выравнивания секций kit-блоков (хранятся в `content` блока). */
export type SectionTextAlign = 'left' | 'center' | 'right';

/** После `resolveSectionAlignFromContent` всегда передаётся из `SectionRenderer`. */
export type ResolvedSectionAlignProps = {
	sectionTitleAlign: SectionTextAlign;
	sectionBodyAlign: SectionTextAlign;
};
