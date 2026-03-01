import { NavigationMenuLink } from '@/kit/components/ui/navigation-menu';
import Link from 'next/link';
import { NavItem } from './types';
import { cn, handleSmoothScroll } from '@/lib/utils';

type NavigationItemProps = {
	subItem: NavItem;
};

export const NavigationItem = ({ subItem }: NavigationItemProps) => {
	return (
		<NavigationMenuLink asChild>
			<Link
				onClick={(e) => {
					e.preventDefault();
					handleSmoothScroll(e, subItem.href);
				}}
				href={subItem.href}
				className={cn(
					'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
				)}>
				<div className='text-sm font-medium leading-none'>{subItem.title}</div>
				<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
					{subItem.description}
				</p>
			</Link>
		</NavigationMenuLink>
	);
};
