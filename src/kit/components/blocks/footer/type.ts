import type { SiteModalId } from '@/kit/features/site-modals';

export type FooterLink = {
	label: string;
	href: string;
};

export type FooterColumn = {
	title: string;
	links?: FooterLink[];
};

export type FooterContact = {
	label: string;
	value: string;
	href: string;
	iconKey?: 'phone' | 'mail' | 'map';
};

export type FooterSocial = {
	platform: string;
	href?: string;
	url?: string;
};

export type FooterCta = {
	label: string;
	href: string;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
	modal?: SiteModalId;
};

export type TFooterContent = {
	tagline?: string;
	companyInfo?: {
		name?: string;
		description?: string;
	};
	columns?: FooterColumn[];
	contacts?: FooterContact[];
	social?: FooterSocial[];
	ctas?: FooterCta[];
	copyright?: string;
	bottomLinks?: FooterLink[];
};

export type TFooter = {
	id: string;
	type: string;
	content: TFooterContent;
};
