import type { NavGroup } from '@/kit/components/shared/navigation/types';
import type { TFooter } from '@/kit/components/blocks/footer/type';
import type { THeader } from '@/kit/components/blocks/header/type';
import { TAboutContent } from '@/kit/components/blocks/about/type';
import type { TInfoblocksContent } from '@/kit/components/blocks/infoblocks/type';
import type { TStatsContent } from '@/kit/components/blocks/stats/type';
import { THeroContent } from '@/kit/components/blocks/hero/type';
import { TPortfoliosContent } from '@/kit/components/blocks/portfolios/types';
import { TReviewsContent } from '@/kit/components/blocks/reviews/types';
import { TServicesContent } from '@/kit/components/blocks/services/types';
import { TTeamsContent } from '@/kit/components/blocks/teams/types';

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

export interface NavigationConfig {
	links: NavGroup[];
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

export type BlockContentByType = {
	hero: THeroContent;
	about: TAboutContent;
	stats: TStatsContent;
	infoblocks: TInfoblocksContent;
	services: TServicesContent;
	portfolios: TPortfoliosContent;
	teams: TTeamsContent;
	reviews: TReviewsContent;
	custom: any;
};

export type BaseBlockType = keyof BlockContentByType;
export type BlockType = `${BaseBlockType}-${string}`;
export type Block =
	| {
			[K in BaseBlockType]: {
				id: string;
				type: `${K}-${string}`;
				content: BlockContentByType[K];
			};
	  }[BaseBlockType]
	| {
			id: string;
			type: string;
			content: any;
	  };

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
	navigation: NavigationConfig;
	pages: PageConfig[];
	header?: THeader;
	footer: TFooter;
}
