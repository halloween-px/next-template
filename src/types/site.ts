import { TAboutContent } from '@/components/blocks/about/type';
import { THeroContent } from '@/components/blocks/hero/type';
import { TPortfoliosContent } from '@/components/blocks/portfolios/types';
import { TReviewsContent } from '@/components/blocks/reviews/types';
import { TServicesContent } from '@/components/blocks/services/types';
import { TTeamsContent } from '@/components/blocks/team/types';

export type ColorScheme = 'light' | 'dark';

export interface ThemeConfig {
	colorScheme: ColorScheme;
	primaryColor: string;
	accentColor: string;
	fonts: {
		heading: string;
		body: string;
	};
}

export interface MetaConfig {
	title: string;
	description: string;
}

// Контент для Portfolio
export interface PortfolioProject {
	title: string;
	description: string;
	category: string;
	image: string;
	technologies: string[];
}

export interface PortfolioContent {
	title: string;
	subtitle: string;
	categories: string[];
	projects: PortfolioProject[];
}

// Контент для Team
export interface TeamMember {
	name: string;
	role: string;
	image: string;
	bio: string;
	social: {
		linkedin?: string;
		twitter?: string;
		github?: string;
		dribbble?: string;
	};
}

export interface TeamContent {
	title: string;
	subtitle: string;
	members: TeamMember[];
}

// Контент для Testimonials
export interface Testimonial {
	text: string;
	author: string;
	position: string;
	rating: number;
}

export interface TestimonialsContent {
	title: string;
	subtitle: string;
	testimonials: Testimonial[];
}

// Контент для Contact
export interface ContactField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'tel' | 'textarea';
	placeholder: string;
	required: boolean;
}

export interface ContactContent {
	title: string;
	subtitle: string;
	description: string;
	contactInfo: Array<{ icon: string; label: string; value: string }>;
	formFields: ContactField[];
}
export interface PageConfig {
	id: string;
	name: string;
	slug: string;
	meta: MetaConfig;
	sections: Block[]; // Теперь разделы строго типизированы
}

export type Block =
	| { id: string; type: string; content: THeroContent }
	| { id: string; type: string; content: TAboutContent }
	| { id: string; type: string; content: TServicesContent }
	| { id: string; type: string; content: TPortfoliosContent }
	| { id: string; type: string; content: TTeamsContent }
	| { id: string; type: string; content: TReviewsContent }
	| { id: string; type: string; content: any };

export type BlockType = Block['type'];

export interface ServicesContent {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	services: Array<{ title: string; description: string; image: string }>;
}
export interface SiteConfig {
	id: string;
	siteName: string;
	theme: ThemeConfig;
	navigation: any; // Можно дотипизировать позже
	pages: PageConfig[];
	footer: {
		companyInfo: { name: string; description: string };
		columns: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
		social: Array<{ platform: string; url: string }>;
		copyright: string;
	};
}
