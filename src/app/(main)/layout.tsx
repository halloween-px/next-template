import { ReactNode } from 'react';
import { MainLayout } from '@/kit/components/layouts/landing-layout/main-layout';

export default function MainGroupLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <MainLayout>{children}</MainLayout>;
}
