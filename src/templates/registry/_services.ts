import {
	servicesConfig,
	servicesConfigV2,
	SERVICES_TYPES,
} from '@/kit/components/blocks/services/config/_services';
import type { TServices } from '@/kit/components/blocks/services/types';

export { SERVICES_TYPES };

export const servicesConfigs: Record<string, TServices> = {
	[SERVICES_TYPES.V1]: {
		...servicesConfig,
		type: SERVICES_TYPES.V1,
	},
	[SERVICES_TYPES.V2]: {
		...servicesConfigV2,
		type: SERVICES_TYPES.V2,
	},
};
