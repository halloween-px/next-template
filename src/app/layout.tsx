import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/kit/components/ui/sonner';
import { ThemeProvider } from '@/kit/components/providers/theme-provider';
import { SiteModalProvider } from '@/kit/features/site-modals';
import { ModalProvider } from '@/providers/modal-provider';
import { QueryClientProviderWrapper } from '@/providers/query-client-provider';
import { getSession } from '@/services/auth';
import { UserProvider } from '@/kit/components/providers/user-provider';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Template - Базовый шаблон',
	description: 'Enterprise шаблон на Next.js 14',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = await getSession();

	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={inter.className}>
				<UserProvider initialUser={user}>
					<QueryClientProviderWrapper>
						<ThemeProvider>
							{children}
							<SiteModalProvider />
							<ModalProvider />
						</ThemeProvider>
					</QueryClientProviderWrapper>
				</UserProvider>
				<Toaster />
			</body>
		</html>
	);
}
