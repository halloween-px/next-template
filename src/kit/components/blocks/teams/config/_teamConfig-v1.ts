import type { TTeams } from '../types';
import { TEAMS_ID, TEAMS_TYPES, defaultTeamsPreset } from './_teams.constants';

export const teamsConfigV1: TTeams = {
	id: TEAMS_ID,
	type: TEAMS_TYPES.V1,
	content: defaultTeamsPreset(),
};
