import { teamsConfigV1, teamsConfigV2, teamsConfigV3, TEAMS_TYPES } from '@/kit/components/blocks/teams/config/_team';
import type { TTeams } from '@/kit/components/blocks/teams/types';

export { TEAMS_TYPES };

export const teamConfigs: Record<string, TTeams> = {
	[TEAMS_TYPES.V1]: teamsConfigV1,
	[TEAMS_TYPES.V2]: teamsConfigV2,
	[TEAMS_TYPES.V3]: teamsConfigV3,
};
