'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/kit/components/ui/button';
import { Container } from '@/kit/components/shared/container';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/kit/components/ui/sheet';
import { useUserContext } from '../../providers/user-provider';
import { useLogoutMutation } from '@/lib/api/hooks/use-auth-mutations';
import { PRODUCT_NAME } from '@/config/product';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';
import { ArrowRight, LayoutDashboard, LayoutTemplate, LogOut, Menu } from 'lucide-react';

/** Рабочая зона приложения (/template …) — отдельно от маркетинговых страниц. */
const productNav = {
	label: 'Мои сайты',
	href: ROUTES.template,
	icon: LayoutDashboard,
} as const;

const marketingNav = [
	{ label: 'Возможности', href: ROUTES.features },
	{ label: 'О нас', href: ROUTES.about },
	{ label: 'Контакты', href: '/contact' },
] as const;

function navLinkActive(pathname: string, href: string): boolean {
	if (href === '/') return pathname === '/';
	return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
	const pathname = usePathname();
	const { user, logout } = useUserContext();
	const logoutMutation = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutMutation.mutateAsync();
			logout();
		} catch {
			// тост из useLogoutMutation
		}
	};

	const productActive = pathname.startsWith('/template');
	const ProductIcon = productNav.icon;

	const ProductNavLink = ({ mobile }: { mobile: boolean }) => (
		<Link
			href={productNav.href}
			prefetch
			className={cn(
				mobile
					? [
							'flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-semibold outline-none transition-all duration-300 ease-out',
							'border border-primary/25 bg-linear-to-br from-primary/14 via-primary/8 to-transparent',
							'text-primary hover:border-primary/40 hover:from-primary/18 hover:shadow-md hover:shadow-primary/15',
							'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
						]
					: [
							'relative isolate inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
							productActive
								? 'bg-primary/15 text-primary shadow-sm ring-1 ring-primary/35 hover:bg-primary/20 hover:ring-primary/45'
								: [
										'text-primary/90',
										'hover:bg-primary/12 hover:text-primary hover:shadow-[0_6px_22px_-10px_hsl(var(--primary)/0.45)] hover:ring-1 hover:ring-primary/25',
										'hover:-translate-y-px',
									],
							'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
						],
				mobile && productActive && 'border-primary/45 bg-primary/18 ring-1 ring-primary/30'
			)}>
			<ProductIcon className='size-[1.05rem] shrink-0 opacity-90' aria-hidden />
			{productNav.label}
		</Link>
	);

	const MarketingNavLinks = ({ mobile }: { mobile: boolean }) => (
		<>
			{marketingNav.map((item) => {
				const active = navLinkActive(pathname, item.href);
				return (
					<Link
						key={item.href}
						href={item.href}
						prefetch
						className={cn(
							mobile
								? [
										'rounded-xl px-4 py-3 text-base font-medium outline-none transition-all duration-300 ease-out',
										'hover:bg-linear-to-br hover:from-primary/12 hover:to-muted/40 hover:text-foreground',
										'hover:shadow-md hover:shadow-primary/10 hover:ring-1 hover:ring-primary/25',
										'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
									]
								: [
										'relative isolate rounded-full px-3 py-1.5 text-sm font-medium outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
										active
											? 'bg-background text-foreground shadow-sm ring-1 ring-border/80 hover:ring-primary/40 hover:shadow-[0_6px_28px_-8px_hsl(var(--primary)/0.38)]'
											: [
													'text-muted-foreground hover:text-foreground',
													'hover:bg-linear-to-b hover:from-primary/14 hover:via-background/95 hover:to-background/90',
													'hover:shadow-[0_6px_24px_-10px_hsl(var(--primary)/0.35)] hover:ring-1 hover:ring-primary/30',
													'hover:-translate-y-px',
												],
										'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
									],
							mobile && active && 'bg-muted font-semibold text-foreground',
							mobile && !active && 'text-muted-foreground'
						)}>
						{item.label}
					</Link>
				);
			})}
		</>
	);

	const AdminNavLink = ({ mobile }: { mobile: boolean }) =>
		user?.role === 'admin' ? (
			<Link
				href='/admin'
				className={cn(
					mobile
						? [
								'rounded-xl px-4 py-3 text-base font-medium text-muted-foreground outline-none transition-all duration-300 ease-out',
								'hover:bg-linear-to-br hover:from-primary/12 hover:to-muted/40 hover:text-foreground',
								'hover:shadow-md hover:shadow-primary/10 hover:ring-1 hover:ring-primary/25',
								'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
							]
						: [
								'relative isolate rounded-full px-3 py-1.5 text-sm font-medium outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
								pathname.startsWith('/admin')
									? 'bg-background text-foreground shadow-sm ring-1 ring-border/80 hover:ring-primary/40 hover:shadow-[0_6px_28px_-8px_hsl(var(--primary)/0.38)]'
									: [
											'text-muted-foreground hover:text-foreground',
											'hover:bg-linear-to-b hover:from-primary/14 hover:via-background/95 hover:to-background/90',
											'hover:shadow-[0_6px_24px_-10px_hsl(var(--primary)/0.35)] hover:ring-1 hover:ring-primary/30',
											'hover:-translate-y-px',
										],
								'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
							],
					pathname.startsWith('/admin') && (mobile ? 'bg-muted font-semibold text-foreground' : '')
				)}>
				Админка
			</Link>
		) : null;

	const MobileNav = () => (
		<>
			<p className='px-4 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
				Продукт
			</p>
			<ProductNavLink mobile />
			<div className='mx-3 my-3 h-px bg-border/90' role='separator' aria-hidden />
			<p className='px-4 pb-1 pt-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
				О компании
			</p>
			<MarketingNavLinks mobile />
			<AdminNavLink mobile />
		</>
	);

	return (
		<header className='sticky top-0 z-50 w-full'>
			{/* Свечение под шапкой */}
			<div
				className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent'
				aria-hidden
			/>
			<div
				className={cn(
					'relative border-b border-border/50 bg-background/75 backdrop-blur-xl backdrop-saturate-150',
					'supports-[backdrop-filter]:bg-background/55 shadow-[inset_0_1px_0_0_hsl(var(--border)/0.35)]'
				)}>
				<Container className='flex h-[var(--height-header)] items-center justify-between gap-4'>
					<div className='flex min-w-0 flex-1 items-center gap-6 md:flex-none md:gap-10'>
						<Link href='/' className='group flex shrink-0 items-center gap-2.5'>
							<span
								className={cn(
									'flex size-9 items-center justify-center rounded-xl',
									'bg-linear-to-br from-primary/30 via-primary/15 to-transparent',
									'ring-1 ring-primary/25 shadow-sm shadow-primary/10 transition-transform duration-300',
									'group-hover:scale-[1.02] group-hover:ring-primary/40'
								)}>
								<LayoutTemplate className='size-[18px] text-primary' aria-hidden />
							</span>
							<span className='text-lg font-bold leading-tight tracking-tight text-foreground'>
								{PRODUCT_NAME}
							</span>
						</Link>

						<nav className='hidden items-center gap-2 md:flex' aria-label='Основная навигация'>
							<div
								className={cn(
									'flex items-center rounded-full border border-primary/20 bg-primary/6 p-1',
									'shadow-[inset_0_1px_0_0_hsl(var(--primary)/0.08)]'
								)}>
								<ProductNavLink mobile={false} />
							</div>
							<div className='flex items-center rounded-full border border-border/60 bg-muted/40 p-1'>
								<MarketingNavLinks mobile={false} />
								<AdminNavLink mobile={false} />
							</div>
						</nav>
					</div>

					<div className='flex shrink-0 items-center gap-2 sm:gap-3'>
						{user ? (
							<>
								<span
									className='hidden max-w-[12rem] truncate rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-left text-xs font-medium text-foreground sm:inline md:max-w-[16rem]'
									title={user.email}>
									{user.email}
								</span>
								<Button
									variant='outline'
									size='sm'
									className='hidden border-border/80 sm:inline-flex'
									onClick={handleLogout}
									loading={logoutMutation.isPending}
									disabled={logoutMutation.isPending}>
									<LogOut className='size-4' aria-hidden />
									Выйти
								</Button>
								<Button
									variant='outline'
									size='icon'
									className='sm:hidden'
									onClick={handleLogout}
									loading={logoutMutation.isPending}
									disabled={logoutMutation.isPending}
									aria-label='Выйти'>
									<LogOut className='size-4' aria-hidden />
								</Button>
							</>
						) : (
							<>
								<Button variant='ghost' size='sm' className='hidden sm:inline-flex' asChild>
									<Link href='/login'>Войти</Link>
								</Button>
								<Button
									size='sm'
									className='hidden bg-linear-to-r from-primary to-primary/90 shadow-md shadow-primary/20 sm:inline-flex'
									asChild>
									<Link href='/register'>
										Регистрация
										<ArrowRight className='size-3.5' aria-hidden />
									</Link>
								</Button>
							</>
						)}

						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant='outline'
									size='icon'
									className='md:hidden'
									aria-label='Открыть меню'>
									<Menu className='size-5' />
								</Button>
							</SheetTrigger>
							<SheetContent
								side='right'
								className='flex w-[min(100vw-2rem,20rem)] flex-col gap-0 p-0'>
								<SheetHeader className='border-b border-border/60 px-6 py-5 text-left'>
									<SheetTitle className='text-base'>Меню</SheetTitle>
								</SheetHeader>
								<nav className='flex flex-col gap-1 p-3' aria-label='Меню сайта'>
									<MobileNav />
								</nav>
								{!user ? (
									<div className='mt-auto flex flex-col gap-2 border-t border-border/60 p-4'>
										<Button variant='outline' className='w-full' asChild>
											<Link href='/login'>Войти</Link>
										</Button>
										<Button className='w-full' asChild>
											<Link href='/register'>
												Регистрация
												<ArrowRight className='size-4' aria-hidden />
											</Link>
										</Button>
									</div>
								) : (
									<div className='mt-auto border-t border-border/60 p-4'>
										<p className='mb-3 truncate text-xs text-muted-foreground' title={user.email}>
											{user.email}
										</p>
										<Button variant='outline' className='w-full' onClick={handleLogout}>
											<LogOut className='size-4' aria-hidden />
											Выйти
										</Button>
									</div>
								)}
							</SheetContent>
						</Sheet>
					</div>
				</Container>
			</div>
		</header>
	);
}
