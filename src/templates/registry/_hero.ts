import {
	heroConfig,
	heroConfigV2,
	heroConfigV3,
	heroConfigV4,
	HERO_TYPES,
} from '@/kit/components/blocks/hero/config/_hero';
import type { THero } from '@/kit/components/blocks/hero/type';

export { HERO_TYPES };

export const heroConfigs: Record<string, THero> = {
	[HERO_TYPES.V1]: {
		...heroConfig,
		type: HERO_TYPES.V1,
	},
	[HERO_TYPES.V2]: {
		...heroConfigV2,
		type: HERO_TYPES.V2,
	},
	[HERO_TYPES.V3]: {
		...heroConfigV3,
		type: HERO_TYPES.V3,
	},
	[HERO_TYPES.V4]: {
		...heroConfigV4,
		type: HERO_TYPES.V4,
	},
};
