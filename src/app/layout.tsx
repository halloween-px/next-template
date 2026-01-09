import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { getSession } from '@/services/auth';
import { UserProvider } from '@/components/providers/user-provider';
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
					<ThemeProvider>{children}</ThemeProvider>
				</UserProvider>
				<Toaster />
			</body>
		</html>
	);
}
