export type NavItem = {
	title: string;
	href: string;
	description?: string;
};

export type NavGroup = {
	title: string;
	href?: string;
	items: NavItem[];
};

export type NavigationVariant = 'menu' | 'list';

export type NavProps = {
	navigationData: NavGroup[];
	variant: NavigationVariant;
};
