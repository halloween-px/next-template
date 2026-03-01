import { siteConfig } from '@/templates/site-template';
import { Block, BlockContentByType } from '@/types/site';
import { create } from 'zustand';

type BlockType = keyof BlockContentByType;

type ChangeBlockTypeProps<T extends BlockType = BlockType> = {
	newType: T;
	sectionId: string;
	newContent: BlockContentByType[T];
};

type MoveSectionProps = {
	sectionId: string;
	direction: 'up' | 'down';
};

type SectionInput<T extends BlockType = BlockType> = {
	id?: string;
	type: T;
	content: BlockContentByType[T];
};

type AddSectionAfterProps = {
	afterSectionId: string | null;
	section: SectionInput;
};

type TUseBuilderStore = {
	sections: Array<Block> | null;
	isLoading: boolean;

	setSection: (sections: Array<Block>) => void;
	changeBlockType: <T extends BlockType>(arg: ChangeBlockTypeProps<T>) => void;

	moveSection: (arg: MoveSectionProps) => void;
	removeSection: (sectionId: string) => void;
	addSectionAfter: (arg: AddSectionAfterProps) => void;
};
const createId = () => {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useBuilderStore = create<TUseBuilderStore>((set) => ({
	sections: siteConfig.pages[0].sections || null,
	isLoading: false,

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
