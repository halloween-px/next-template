import { listSiteProjectsForUser } from '@/lib/db/site-project-queries';
import { getSession } from '@/services/auth';
import { TemplateHubClient } from '@/widgets/template-hub/ui/template-hub-client';

/**
 * Данные списка проектов грузим на сервере (сессия + MongoDB).
 * Клиент нужен только для диалога создания и POST.
 */
export default async function TemplateHubPage() {
	const session = await getSession();
	const projects = session ? await listSiteProjectsForUser(session.id) : [];

	return <TemplateHubClient initialProjects={projects} isLoggedIn={Boolean(session)} />;
}
