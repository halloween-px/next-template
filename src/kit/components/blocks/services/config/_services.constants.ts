import type { TServices } from '../types';

export type { TServices };

export const SERVICES_ID = 'section-services';

export const SERVICES_TYPES = {
	V1: 'services-v1',
	V2: 'services-v2',
} as const;

/** @deprecated используйте SERVICES_TYPES.V1 */
export const SERVICES_TYPE = SERVICES_TYPES.V1;
