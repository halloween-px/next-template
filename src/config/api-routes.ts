const API_ROOT = '/api';

export const API_ROUTES = {
	auth: {
		register: `${API_ROOT}/auth/register`,
		login: `${API_ROOT}/auth/login`,
		logout: `${API_ROOT}/auth/logout`,
		me: `${API_ROOT}/auth/me`,
	},
	siteProjects: {
		root: `${API_ROOT}/site-projects`,
		byId: (id: string) => `${API_ROOT}/site-projects/${id}`,
	},
	users: {
		root: `${API_ROOT}/users`,
		byId: (id: string) => `${API_ROOT}/users/${id}`,
	},
	products: {
		root: `${API_ROOT}/products`,
	},
	main: '/',
};
