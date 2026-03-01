import { ROUTES } from '@/config/routes';
import SectionRenderer from '@/core/renderer';
import { OpenBuilderPage } from '@/features/open-edit-page/open-edit-page';
import { siteConfig } from '@/templates/site-template';

const Template = ({ params }: { params: { slug: string[] } }) => {
	const pathName = params.slug?.length ? `/${params.slug.join('/')}` : '/';
	const currnetSlug = pathName === ROUTES.template ? '/' : pathName.replace(ROUTES.template, '');
	const currentPage = siteConfig.pages.find((page) => page.slug === currnetSlug);
	const sections = currentPage?.sections;

	return (
		<div className='relative'>
			{sections?.map((section) => {
				return <SectionRenderer section={section} key={section.id} />;
			})}

			<OpenBuilderPage />
		</div>
	);
};

export default Template;
