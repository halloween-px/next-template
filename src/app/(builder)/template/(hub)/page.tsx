import { listSiteProjectsForUser } from '@/lib/db/site-project-queries';
import { getSession } from '@/services/auth';
import { SiteProjectsPageClient } from '@/widgets/site-projects/ui/site-projects-page-client';

/**
 * Данные списка проектов грузим на сервере (сессия + MongoDB).
 * Клиент нужен только для диалога создания и POST.
 */
export default async function MySitesPage() {
	const session = await getSession();
	const projects = session ? await listSiteProjectsForUser(session.id) : [];

	return <SiteProjectsPageClient initialProjects={projects} isLoggedIn={Boolean(session)} />;
}
