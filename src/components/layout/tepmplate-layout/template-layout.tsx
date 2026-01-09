import { PropsWithChildren } from 'react';
import { Footer } from '../landing-layout/footer';
import { Header } from '@/components/blocks/header';
import { ROUTES } from '@/config/routes';

export const TemplateLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Header linkToMain={ROUTES.template} />
			<main style={{ minHeight: 'calc(100vh - (var(--height-footer) + var(--height-header)))' }}>
				{children}
			</main>
			<Footer />
		</>
	);
};
