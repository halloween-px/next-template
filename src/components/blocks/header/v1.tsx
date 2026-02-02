'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Container } from '@/components/shared/container';
import { HeaderProps } from './type';
import { Logo } from '@/components/shared/logo';
import { Navigation } from '@/components/shared/navigation/navigation';

export default function HeaderV1({
	linkToMain,
	navigationData,
	navigationVariant = 'menu',
	buttons,
}: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<Container>
				<div className='container flex h-16 items-center justify-between'>
					<Logo linkToMain={linkToMain} />
					<Navigation navigationData={navigationData} variant={navigationVariant} />

					<div className='hidden md:flex md:items-center md:gap-2'>
						{buttons &&
							buttons.map((button) => (
								<Button key={button.label} variant={button.variant || 'ghost'} asChild>
									<Link href={button.href}>{button.label}</Link>
								</Button>
							))}
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
								{navigationData.map((item) => (
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
