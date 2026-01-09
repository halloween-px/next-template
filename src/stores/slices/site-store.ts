import { landingTemplate } from '@/templates/_landing-template';
import { Block } from '@/types/site';
import { create } from 'zustand';

type changeBlockTypePops = {
	newType: string;
	sectionId: string;
	newContent?: string;
};
type TUseBuilderStore = {
	sections: Array<Block> | null;
	isLoading: boolean;
	changeBlockType: (arg: changeBlockTypePops) => void;
	setSection: (sections: Array<Block>) => void;
};

export const useBuilderStore = create<TUseBuilderStore>((set) => ({
	sections: landingTemplate.pages[0].sections || null,
	isLoading: false,

	setSection: (sections: Array<Block>) => set({ sections }),
	changeBlockType: ({ newType, sectionId, newContent }) => {
		set((state) => ({
			sections: state.sections?.map((section) => {
				if (section.id === sectionId) {
					return {
						...section,
						type: newType,
						content: newContent || section.content,
					};
				}
				return section;
			}),
		}));
	},
}));
