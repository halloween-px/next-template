import type { TReviews } from '../types';
import { REVIEWS_ID, REVIEWS_TYPES, defaultReviewsPreset } from './_reviews.constants';

export const reviewsConfigV1: TReviews = {
	id: REVIEWS_ID,
	type: REVIEWS_TYPES.V1,
	content: defaultReviewsPreset(),
};
