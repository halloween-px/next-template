import {
	NavigationMenu as NavigationMenuComponent,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/kit/components/ui/navigation-menu';
import { NavProps } from '../types';
import { NavigationItem } from '../navigation-item';

export const NavigationMenu = ({ navigationData }: Omit<NavProps, 'variant'>) => {
	return (
		<nav className='hidden md:flex md:flex-1 md:justify-center'>
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
