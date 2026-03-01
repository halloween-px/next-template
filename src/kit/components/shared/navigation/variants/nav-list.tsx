import Link from 'next/link';
import { NavProps } from '../types';
import { cn } from '@/lib/utils';

export const NavigationList = ({ navigationData, className }: Omit<NavProps, 'variant'>) => {
	return (
		<nav className={cn('hidden md:flex md:flex-1 md:justify-center', className)}>
			{navigationData.map((group) => (
				<div key={group.title} className='space-y-2'>
					<div className='text-sm font-medium text-foreground'>{group.title}</div>
					<ul className='space-y-1'>
						{group.items.map((subItem) => (
							<li key={subItem.title}>
								<Link
									href={subItem.href}
									className={cn(
										'text-sm text-muted-foreground hover:text-foreground transition-colors'
									)}>
									{subItem.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	);
};
