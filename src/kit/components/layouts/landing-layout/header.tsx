'use client';

import Link from 'next/link';
import { Button } from '@/kit/components/ui/button';
import { Container } from '@/kit/components/shared/container';
import { useUserContext } from '../../providers/user-provider';
import { useMutation } from '@/kit/hooks/useMutation';
import { API_ROUTES } from '@/config/api-routes';
import { ROUTES } from '@/config/routes';

const navigations = [
	{
		label: 'Шаблон',
		href: ROUTES.template,
	},
	{
		label: 'О нас',
		href: ROUTES.about,
	},
	{
		label: 'Контакты',
		href: '/contact',
	},
];

export function Header() {
	const { user, logout } = useUserContext();
	const { mutate, isLoading } = useMutation(API_ROUTES.auth.logout);

	const handleLogout = async () => {
		await mutate();
		logout();
	};

	return (
		<header className='sticky top-0 z-50 w-full h-header border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<Container className='flex h-16 items-center justify-between'>
				<div className='flex items-center gap-6'>
					<Link href='/' className='font-bold text-xl'>
						Template
					</Link>
					<nav className='hidden md:flex gap-6'>
						{navigations.map((navigation) => (
							<Link
								key={navigation.href}
								href={navigation.href}
								prefetch
								className='text-sm font-medium hover:text-primary'>
								{navigation.label}
							</Link>
						))}
						{user?.role === 'admin' && (
							<Link href='/admin' className='text-sm font-medium hover:text-primary'>
								Админка
							</Link>
						)}
					</nav>
				</div>

				<div className='flex items-center gap-4'>
					{user ? (
						<>
							<span className='text-sm'>{user.email}</span>
							<Button
								variant='outline'
								size='sm'
								onClick={handleLogout}
								loading={isLoading}
								disabled={isLoading}>
								Выйти
							</Button>
						</>
					) : (
						<>
							<Link href='/login'>
								<Button variant='ghost' size='sm'>
									Войти
								</Button>
							</Link>
							<Link href='/register'>
								<Button size='sm'>Регистрация</Button>
							</Link>
						</>
					)}
				</div>
			</Container>
		</header>
	);
}
