import {
	reviewsConfigV1,
	reviewsConfigV2,
	reviewsConfigV3,
	REVIEWS_TYPES,
} from '@/kit/components/blocks/reviews/config/_reviews';
import type { TReviews } from '@/kit/components/blocks/reviews/types';

export { REVIEWS_TYPES };

export const reviewsConfigs: Record<string, TReviews> = {
	[REVIEWS_TYPES.V1]: reviewsConfigV1,
	[REVIEWS_TYPES.V2]: reviewsConfigV2,
	[REVIEWS_TYPES.V3]: reviewsConfigV3,
};
