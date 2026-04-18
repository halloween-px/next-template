import type { TPortfolios } from '../types';
import {
	defaultPortfoliosPreset,
	PORTFOLIOS_ID,
	PORTFOLIOS_TYPES,
} from './_portfolios.constants';

/** Крупные карточки с градиентной обводкой и стеклянной панелью — см. `v3.tsx`. */
export const portfoliosConfigV3: TPortfolios = {
	id: PORTFOLIOS_ID,
	type: PORTFOLIOS_TYPES.V3,
	content: defaultPortfoliosPreset(),
};
