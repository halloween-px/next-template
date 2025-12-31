'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Container } from '@/components/shared/сontainer';
import navigationItems from './json/landingNav.json';

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
	if (href.startsWith('#')) {
		e.preventDefault();
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
};

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<Container>
				<div className='container flex h-16 items-center justify-between'>
					{/* Logo */}
					<Link href='/' className='flex items-center gap-2'>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
							<span className='text-lg font-bold text-primary-foreground'>V</span>
						</div>
						<span className='text-xl font-bold'>Vercel</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex md:flex-1 md:justify-center'>
						<NavigationMenu>
							<NavigationMenuList>
								{navigationItems.map((item) => (
									<NavigationMenuItem key={item.title}>
										<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
												{item.items.map((subItem) => (
													<li key={subItem.title}>
														<NavigationMenuLink asChild>
															<Link
																href={subItem.href}
																className={cn(
																	'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
																)}>
																<div className='text-sm font-medium leading-none'>
																	{subItem.title}
																</div>
																<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
																	{subItem.description}
																</p>
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								))}
								<NavigationMenuItem>
									<NavigationMenuLink
										asChild
										className='group inline-flex w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'>
										<Link href='/pricing'>Цены</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</nav>

					{/* Desktop Actions */}
					<div className='hidden md:flex md:items-center md:gap-2'>
						<Button variant='ghost' asChild>
							<Link href='/login'>Войти</Link>
						</Button>
						<Button asChild>
							<Link href='/signup'>Начать</Link>
						</Button>
					</div>

					{/* Mobile Menu */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild className='md:hidden'>
							<Button variant='ghost' size='icon'>
								<Menu className='h-5 w-5' />
								<span className='sr-only'>Открыть меню</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-[300px] sm:w-[400px]'>
							<SheetHeader>
								<SheetTitle>Меню</SheetTitle>
							</SheetHeader>
							<nav className='flex flex-col gap-4 mt-8'>
								{navigationItems.map((item) => (
									<div key={item.title} className='space-y-3'>
										<h4 className='font-medium text-sm text-muted-foreground'>{item.title}</h4>
										<ul className='space-y-2 pl-4'>
											{item.items.map((subItem) => (
												<li key={subItem.title}>
													<Link
														href={subItem.href}
														onClick={() => setIsOpen(false)}
														className='block text-sm py-1 hover:text-primary transition-colors'>
														{subItem.title}
													</Link>
												</li>
											))}
										</ul>
									</div>
								))}
								<Link
									href='/pricing'
									onClick={() => setIsOpen(false)}
									className='text-sm py-2 hover:text-primary transition-colors font-medium'>
									Цены
								</Link>
								<div className='flex flex-col gap-2 pt-4 border-t'>
									<Button variant='outline' asChild>
										<Link href='/login' onClick={() => setIsOpen(false)}>
											Войти
										</Link>
									</Button>
									<Button asChild>
										<Link href='/signup' onClick={() => setIsOpen(false)}>
											Начать
										</Link>
									</Button>
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</Container>
		</header>
	);
}
