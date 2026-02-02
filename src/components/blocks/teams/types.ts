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
		social: {
			linkedin: string;
			twitter: string;
			github: string;
		};
	}>;
};

export type TTeams = {
	id: string;
	type: string;
	content: TTeamsContent;
};
