import { MainLayout } from '@/kit/components/layouts/landing-layout/main-layout';
import { PropsWithChildren } from 'react';

export default function MySitesLayout({ children }: PropsWithChildren) {
	return <MainLayout>{children}</MainLayout>;
}
