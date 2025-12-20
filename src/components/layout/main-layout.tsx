import { PropsWithChildren } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export const MainLayout = ({ children }: PropsWithChildren) => {
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
