import { getSiteProjectForUser } from '@/lib/db/site-project-queries';
import { getSession } from '@/services/auth';
import { ProjectPreviewActions } from '@/widgets/site-project-preview/ui/project-preview-actions';
import { SiteProjectPreviewShell } from '@/widgets/site-project-preview/ui/site-project-preview-shell';
import { notFound, redirect } from 'next/navigation';

type Props = {
	children: React.ReactNode;
	params: Promise<{ projectId: string }>;
};

export default async function ProjectPreviewLayout({ children, params }: Props) {
	const { projectId } = await params;
	const session = await getSession();
	if (!session) {
		redirect(`/login?callbackUrl=${encodeURIComponent(`/template/project/${projectId}`)}`);
	}

	const project = await getSiteProjectForUser(projectId, session.id);
	if (!project) {
		notFound();
	}

	return (
		<SiteProjectPreviewShell config={project.config} projectId={projectId}>
			{children}
			<ProjectPreviewActions />
		</SiteProjectPreviewShell>
	);
}
