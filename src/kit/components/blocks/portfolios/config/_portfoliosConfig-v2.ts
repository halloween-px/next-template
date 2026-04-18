import type { TPortfolios } from '../types';
import {
	defaultPortfoliosPreset,
	PORTFOLIOS_ID,
	PORTFOLIOS_TYPES,
} from './_portfolios.constants';

/** Та же структура данных, компактная сетка из трёх колонок — см. `v2.tsx`. */
export const portfoliosConfigV2: TPortfolios = {
	id: PORTFOLIOS_ID,
	type: PORTFOLIOS_TYPES.V2,
	content: defaultPortfoliosPreset(),
};
