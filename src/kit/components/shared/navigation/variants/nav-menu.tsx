import {
	NavigationMenu as NavigationMenuComponent,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/kit/components/ui/navigation-menu';
import { NavProps } from '../types';
import { NavigationItem } from '../navigation-item';
import { cn } from '@/lib/utils';

export const NavigationMenu = ({ navigationData, className }: Omit<NavProps, 'variant'>) => {
	return (
		<nav className={cn('hidden min-w-0 md:flex md:flex-1 md:justify-center', className)}>
			<NavigationMenuComponent>
				<NavigationMenuList>
					{navigationData.map((item) => (
						<NavigationMenuItem key={item.title}>
							<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
									{item.items.map((subItem) => (
										<li key={subItem.title}>
											<NavigationItem subItem={subItem} />
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenuComponent>
		</nav>
	);
};
