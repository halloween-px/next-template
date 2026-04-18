export const queryKeys = {
	siteProjects: {
		all: ['siteProjects'] as const,
		list: () => [...queryKeys.siteProjects.all, 'list'] as const,
	},
} as const;
