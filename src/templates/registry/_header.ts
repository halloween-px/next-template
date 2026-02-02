import { headerConfig } from '@/components/blocks/header/config/_header';

export const HEADER_TYPES = {
	V1: 'header-v1',
	V2: 'header-v2',
} as const;

export const headerConfigs: Record<string, typeof headerConfig> = {
	[HEADER_TYPES.V1]: {
		...headerConfig,
		type: HEADER_TYPES.V1,
	},
	[HEADER_TYPES.V2]: {
		...headerConfig,
		type: HEADER_TYPES.V2,
	},
};

export const defaultHeaderConfig = headerConfigs[HEADER_TYPES.V1];
