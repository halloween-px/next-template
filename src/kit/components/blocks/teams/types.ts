import type { SectionTextAlign } from '@/types/section-layout';

export type TTeamsContent = {
	title: string;
	subtitle: string;
	description: string;
	teams: Array<{
		id: string;
		name: string;
		role: string;
		image: string;
		bio: string;
		/** Доп. абзац о человеке (например в teams-v2) */
		bioDetail?: string;
		/** Короткие пункты — удобно для v2 рядом с основным текстом */
		focusAreas?: string[];
		social: {
			linkedin: string;
			twitter: string;
			github: string;
		};
	}>;
	sectionTitleAlign?: SectionTextAlign;
	sectionBodyAlign?: SectionTextAlign;
};

export type TTeams = {
	id: string;
	type: string;
	content: TTeamsContent;
};
