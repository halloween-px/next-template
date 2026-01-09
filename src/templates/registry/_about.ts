import { aboutConfig } from '@/components/blocks/about/config/_about';
import { TAbout } from '@/components/blocks/about/type';

export const ABOUT_TYPES = {
	V1: 'about-v1',
	V2: 'about-v2',
} as const;

export const aboutConfigs: Record<string, TAbout> = {
	[ABOUT_TYPES.V1]: {
		...aboutConfig,
		type: ABOUT_TYPES.V1,
	},
	[ABOUT_TYPES.V2]: {
		...aboutConfig,
		type: ABOUT_TYPES.V2,
	},
};

export const defaultAboutConfig = aboutConfigs[ABOUT_TYPES.V1];
