/** Barrel: константы и пресеты reviews-v1 / v2 / v3 */
export {
	defaultReviewsPreset,
	REVIEWS_ID,
	REVIEWS_TYPE,
	REVIEWS_TYPES,
} from './_reviews.constants';
export { reviewsConfigV1 } from './_reviewsConfig-v1';
export { reviewsConfigV2 } from './_reviewsConfig-v2';
export { reviewsConfigV3 } from './_reviewsConfig-v3';

/** Дефолт сайта — v1 */
import { reviewsConfigV1 } from './_reviewsConfig-v1';
export const reviewsConfig = reviewsConfigV1;
