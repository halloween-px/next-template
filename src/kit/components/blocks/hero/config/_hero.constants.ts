/** Идентификаторы и типы строки hero — общие для пресетов v1 / v2 / v3 */

export type { THero } from '../type';

export const HERO_ID = 'section-hero';

export const HERO_TYPES = {
	V1: 'hero-v1',
	V2: 'hero-v2',
	V3: 'hero-v3',
	V4: 'hero-v4',
} as const;

/** @deprecated используйте HERO_TYPES.V1 */
export const HERO_TYPE = HERO_TYPES.V1;
