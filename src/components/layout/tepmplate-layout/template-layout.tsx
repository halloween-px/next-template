import { PropsWithChildren } from 'react';
import { Footer } from '../landing-layout/footer';
import { Header } from '@/components/blocks/header';

export const TemplateLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header />
			<main
				className=''
				style={{ minHeight: 'calc(100vh - (var(--height-footer) + var(--height-header)))' }}>
				{children}
			</main>
			<Footer />
		</>
	);
};
