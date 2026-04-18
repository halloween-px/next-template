import {
	portfoliosConfigV1,
	portfoliosConfigV2,
	portfoliosConfigV3,
	PORTFOLIOS_TYPES,
} from '@/kit/components/blocks/portfolios/config/_portfolios';
import type { TPortfolios } from '@/kit/components/blocks/portfolios/types';

export { PORTFOLIOS_TYPES };

export const portfolioConfigs: Record<string, TPortfolios> = {
	[PORTFOLIOS_TYPES.V1]: portfoliosConfigV1,
	[PORTFOLIOS_TYPES.V2]: portfoliosConfigV2,
	[PORTFOLIOS_TYPES.V3]: portfoliosConfigV3,
};
