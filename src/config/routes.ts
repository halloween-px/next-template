export const ROUTES = {
	about: '/about',
	features: '/features',
	template: '/template',
	templateProject: (projectId: string) => `/template/project/${projectId}`,
	builder: '/builder',
	/** Лаборатория темы (компоненты + сайдбар), черновик сохраняется для создания проекта. */
	themeLab: '/test',
};
