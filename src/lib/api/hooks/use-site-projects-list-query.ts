'use client';

import { API_ROUTES } from '@/config/api-routes';
import { api } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/query-keys';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { useQuery } from '@tanstack/react-query';

export function useSiteProjectsListQuery(
	initialData: SiteProjectListItem[],
	enabled: boolean
) {
	return useQuery({
		queryKey: queryKeys.siteProjects.list(),
		queryFn: ({ signal }) => api.get<SiteProjectListItem[]>(API_ROUTES.siteProjects.root, signal),
		enabled,
		initialData: enabled ? initialData : undefined,
	});
}
