import { statsConfig } from '@/kit/components/blocks/stats/config/_stats';
import type { TStats } from '@/kit/components/blocks/stats/type';

export const STATS_TYPES = {
	V1: 'stats-v1',
} as const;

export const statsConfigs: Record<string, TStats> = {
	[STATS_TYPES.V1]: {
		...statsConfig,
		type: STATS_TYPES.V1,
	},
};

export const defaultStatsConfig = statsConfigs[STATS_TYPES.V1];
