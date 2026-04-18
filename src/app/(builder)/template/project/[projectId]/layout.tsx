import { getSiteProjectForUser } from '@/lib/db/site-project-queries';
import { getSession } from '@/services/auth';
import { notFound, redirect } from 'next/navigation';
import { ProjectPreviewScene } from './ui/project-preview-scene';

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
		<ProjectPreviewScene config={project.config} projectId={projectId}>
			{children}
		</ProjectPreviewScene>
	);
}
