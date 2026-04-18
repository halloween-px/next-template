import type { BaseBlockType, Block, BlockContentByType } from '@/types/site';
import { create } from 'zustand';

/** Как в `SiteConfig`: `about-v1`, `about-v2`, а не базовый ключ `about`. */
type ChangeBlockTypeProps<B extends BaseBlockType> = {
	newType: `${B}-${string}`;
	sectionId: string;
	newContent: BlockContentByType[B];
};

type MoveSectionProps = {
	sectionId: string;
	direction: 'up' | 'down';
};

export type SectionInput<B extends BaseBlockType = BaseBlockType> = {
	id?: string;
	type: `${B}-${string}`;
	content: BlockContentByType[B];
};

type AddSectionAfterProps = {
	afterSectionId: string | null;
	section: SectionInput;
};

type TUseBuilderStore = {
	activeSection: Block['id'] | null;
	sections: Array<Block> | null;
	isLoading: boolean;

	setSection: (sections: Array<Block>) => void;
	setActiveSection: (id: Block['id']) => void;
	clearActiveSection: () => void;
	changeBlockType: <B extends BaseBlockType>(arg: ChangeBlockTypeProps<B>) => void;
	/** Частичное обновление контента блока (например выравнивание секции). */
	patchSectionContent: (sectionId: string, patch: Record<string, unknown>) => void;

	moveSection: (arg: MoveSectionProps) => void;
	removeSection: (sectionId: string) => void;
	addSectionAfter: (arg: AddSectionAfterProps) => void;
};
const createId = () => {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useBuilderStore = create<TUseBuilderStore>((set) => ({
	sections: null,
	activeSection: null,
	isLoading: false,

	setActiveSection: (id) => set({ activeSection: id }),
	clearActiveSection: () => set({ activeSection: null }),
	setSection: (sections: Array<Block>) => set({ sections }),

	changeBlockType: ({ newType, sectionId, newContent }) => {
		set((state) => ({
			sections: state.sections?.map((section) => {
				if (section.id === sectionId) {
					return {
						id: section.id,
						type: newType,
						content: newContent,
					};
				}
				return section;
			}),
		}));
	},

	patchSectionContent: (sectionId, patch) => {
		set((state) => ({
			sections: state.sections?.map((section) =>
				section.id === sectionId
					? {
							...section,
							content: { ...(section.content as Record<string, unknown>), ...patch },
						}
					: section
			),
		}));
	},

	moveSection: ({ sectionId, direction }) => {
		set((state) => {
			if (!state.sections) return { sections: state.sections };

			const sections = [...state.sections];
			const index = sections.findIndex((s) => s.id === sectionId);
			if (index === -1) return { sections: state.sections };

			const nextIndex = direction === 'up' ? index - 1 : index + 1;
			if (nextIndex < 0 || nextIndex >= sections.length) return { sections: state.sections };

			[sections[index], sections[nextIndex]] = [sections[nextIndex], sections[index]];
			return { sections };
		});
	},

	removeSection: (sectionId) => {
		set((state) => ({
			sections: state.sections?.filter((s) => s.id !== sectionId) || null,
		}));
	},

	addSectionAfter: ({ afterSectionId, section }) => {
		set((state) => {
			const base = state.sections ? [...state.sections] : [];

			const nextSection: Block = {
				id: section.id ?? createId(),
				type: section.type,
				content: section.content,
			};

			if (afterSectionId === null) {
				base.unshift(nextSection);
				return { sections: base };
			}

			const index = base.findIndex((s) => s.id === afterSectionId);
			const insertAt = index === -1 ? base.length : index + 1;
			base.splice(insertAt, 0, nextSection);

			return { sections: base };
		});
	},
}));

export const setActiveBlockId = (id: Block['id']) => {
	useBuilderStore.getState().setActiveSection(id);
};
