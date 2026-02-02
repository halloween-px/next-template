'use client';

import Breadcrumbs from '@/components/blocks/breadcrumbs/breadcrumbs';
import { ROUTES } from '@/config/routes';
import SectionRenderer from '@/core/renderer';
import { siteConfig } from '@/templates/site-template';
import { usePathname } from 'next/navigation';

const Template = () => {
	const pathName = usePathname();
	const currnetSlug = pathName === ROUTES.template ? '/' : pathName.replace(ROUTES.template, '');
	const isHome = currnetSlug === '/';
	const currentPage = siteConfig.pages.find((page) => page.slug === currnetSlug);
	const sections = currentPage?.sections;

	const headerSection = {
		...siteConfig.header,
		content: {
			...siteConfig.header.content,
			navigationData: [...siteConfig.navigation.links],
		},
	};

	return (
		<>
			<SectionRenderer section={headerSection} />

			{!isHome && (
				<Breadcrumbs segments={[{ label: currentPage?.name || '', href: currnetSlug }]} />
			)}
			{sections?.map((section) => {
				return <SectionRenderer section={section} key={section.id} />;
			})}
		</>
	);
};

export default Template;
