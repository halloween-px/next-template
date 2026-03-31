import { ROUTES } from '@/config/routes';
import { redirect } from 'next/navigation';

type Props = {
	searchParams: Promise<{ projectId?: string; slug?: string }>;
};

function normalizeSlug(value?: string) {
	if (!value || value === '/') return '';
	return value.startsWith('/') ? value : `/${value}`;
}

export default async function TemplateBuilderPage({ searchParams }: Props) {
	const { projectId, slug } = await searchParams;

	if (!projectId) {
		redirect(ROUTES.template);
	}

	redirect(`${ROUTES.templateProject(projectId)}${normalizeSlug(slug)}`);
}
