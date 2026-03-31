import { PropsWithChildren } from 'react';

export const metadata = {
	title: 'Шаблон — мои сайты',
	description: 'Создание и превью сайтов на базе шаблона',
};

export default function TemplateRootLayout({ children }: PropsWithChildren) {
	return <div className='min-h-screen bg-background'>{children}</div>;
}
