/** Barrel: константы и пресеты portfolios-v1 / v2 / v3 */
export {
	defaultPortfoliosPreset,
	PORTFOLIOS_ID,
	PORTFOLIOS_TYPE,
	PORTFOLIOS_TYPES,
} from './_portfolios.constants';
export { portfoliosConfigV1 } from './_portfoliosConfig-v1';
export { portfoliosConfigV2 } from './_portfoliosConfig-v2';
export { portfoliosConfigV3 } from './_portfoliosConfig-v3';

/** Дефолт сайта — v1 */
import { portfoliosConfigV1 } from './_portfoliosConfig-v1';
export const portfoliosConfig = portfoliosConfigV1;
