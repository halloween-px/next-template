import { TemplateLayout } from '@/components/layout/tepmplate-layout/template-layout';
import { PropsWithChildren } from 'react';

export const metadata = {
	title: 'Template - Базовый шаблон',
	description: 'Enterprise шаблон на Next.js 14',
};
const Layout = ({ children }: PropsWithChildren) => {
	return <TemplateLayout>{children}</TemplateLayout>;
};

export default Layout;
