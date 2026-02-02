import { PropsWithChildren } from 'react';

export const TemplateLayout = ({ children }: PropsWithChildren) => {
	return (
		<main style={{ minHeight: 'calc(100vh - (var(--height-footer) + var(--height-header)))' }}>
			{children}
		</main>
	);
};
