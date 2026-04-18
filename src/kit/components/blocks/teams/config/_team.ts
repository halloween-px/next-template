/** Barrel: константы и пресеты teams-v1 / v2 / v3 */
export {
	defaultTeamsPreset,
	TEAMS_ID,
	TEAMS_TYPE,
	TEAMS_TYPES,
} from './_teams.constants';
export { teamsConfigV1 } from './_teamConfig-v1';
export { teamsConfigV2 } from './_teamConfig-v2';
export { teamsConfigV3 } from './_teamConfig-v3';

/** Дефолт сайта — v1 */
import { teamsConfigV1 } from './_teamConfig-v1';
export const teamsConfig = teamsConfigV1;
