import { footerConfig } from '@/kit/components/blocks/footer/config/_footer';
import type { TFooter } from '@/kit/components/blocks/footer/type';

export const FOOTER_TYPES = {
	V1: 'footer-v1',
} as const;

export const footerConfigs: Record<string, TFooter> = {
	[FOOTER_TYPES.V1]: {
		...footerConfig,
		type: FOOTER_TYPES.V1,
	},
};

export const defaultFooterConfig = footerConfigs[FOOTER_TYPES.V1];
