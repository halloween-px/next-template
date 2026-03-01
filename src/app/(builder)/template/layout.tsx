import Breadcrumbs from '@/kit/components/blocks/breadcrumbs/breadcrumbs';
import { TemplateLayout } from '@/kit/components/layouts/template-layout/template-layout';
import { ROUTES } from '@/config/routes';
import SectionRenderer from '@/core/renderer';
import { siteConfig } from '@/templates/site-template';
import { PropsWithChildren } from 'react';

export const metadata = {
	title: 'Template - Базовый шаблон',
	description: 'Enterprise шаблон на Next.js 14',
};
const Layout = ({ children, params }: PropsWithChildren<{ params: { slug: string[] } }>) => {
	const pathName = params.slug?.length ? `/${params.slug.join('/')}` : '/';
	const currnetSlug = pathName === ROUTES.template ? '/' : pathName.replace(ROUTES.template, '');
	const isHome = currnetSlug === '/';
	const currentPage = siteConfig.pages.find((page) => page.slug === currnetSlug);

	return (
		<TemplateLayout>
			<SectionRenderer section={siteConfig.header} />

			{!isHome && (
				<Breadcrumbs segments={[{ label: currentPage?.name || '', href: currnetSlug }]} />
			)}
			{children}
		</TemplateLayout>
	);
};

export default Layout;
