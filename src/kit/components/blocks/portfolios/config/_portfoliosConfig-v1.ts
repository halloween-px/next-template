import type { TPortfolios } from '../types';
import {
	defaultPortfoliosPreset,
	PORTFOLIOS_ID,
	PORTFOLIOS_TYPES,
} from './_portfolios.constants';

export const portfoliosConfigV1: TPortfolios = {
	id: PORTFOLIOS_ID,
	type: PORTFOLIOS_TYPES.V1,
	content: defaultPortfoliosPreset(),
};
