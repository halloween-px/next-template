import { infoblocksConfig } from '@/kit/components/blocks/infoblocks/config/_infoblocks';
import type { TInfoblocks } from '@/kit/components/blocks/infoblocks/type';

export const INFOBLOCKS_TYPES = {
	V1: 'infoblocks-v1',
} as const;

export const infoblocksConfigs: Record<string, TInfoblocks> = {
	[INFOBLOCKS_TYPES.V1]: {
		...infoblocksConfig,
		type: INFOBLOCKS_TYPES.V1,
	},
};

export const defaultInfoblocksConfig = infoblocksConfigs[INFOBLOCKS_TYPES.V1];
