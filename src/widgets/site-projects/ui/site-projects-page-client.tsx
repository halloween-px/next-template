'use client';

import { useSiteProjectsListQuery } from '@/lib/api/hooks/use-site-projects-list-query';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { SiteProjectsList } from './site-projects-list';

type Props = {
	initialProjects: SiteProjectListItem[];
	isLoggedIn: boolean;
};

export function SiteProjectsPageClient({ initialProjects, isLoggedIn }: Props) {
	const { data: projects = initialProjects } = useSiteProjectsListQuery(initialProjects, isLoggedIn);

	return (
		<SiteProjectsList isLoggedIn={isLoggedIn} projects={isLoggedIn ? projects : []} />
	);
}
