import Breadcrumbs from '@/kit/components/blocks/breadcrumbs/breadcrumbs';

type Props = {
	homeLink: string;
	currentSlug: string;
	currentPageName?: string;
};

export function ProjectBreadcrumbs({ homeLink, currentSlug, currentPageName }: Props) {
	return (
		<Breadcrumbs
			homeLink={homeLink}
			segments={[{ label: currentPageName || '', href: currentSlug }]}
		/>
	);
}
