import { Navigation } from '@/kit/components/shared/navigation/navigation';
import { NavGroup } from '@/kit/components/shared/navigation/types';
import { CommonSheet } from '@/kit/components/shared/sheets/common-sheet';
import { Button } from '@/kit/components/ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ButtonsHeader } from '../type';
import { SheetFooter, SheetHeader, SheetTitle } from '@/kit/components/ui/sheet';

type SheetMobileMenuProps = {
	navigationData: NavGroup[];
	buttons?: ButtonsHeader[];
};

export const SheetMobileMenu = ({ navigationData, buttons }: SheetMobileMenuProps) => {
	return (
		<CommonSheet>
			<CommonSheet.Trigger className='md:hidden' isButton>
				<Menu />
			</CommonSheet.Trigger>
			<CommonSheet.Content>
				<SheetHeader>
					<SheetTitle>Меню</SheetTitle>
				</SheetHeader>
				<Navigation
					navigationData={navigationData}
					variant='list'
					className='flex flex-col px-4 gap-y-6'
				/>
				<SheetFooter>
					{buttons &&
						buttons.map((button) => (
							<Button key={button.label} variant={button.variant || 'ghost'} asChild>
								<Link href={button.href}>{button.label}</Link>
							</Button>
						))}
				</SheetFooter>
			</CommonSheet.Content>
		</CommonSheet>
	);
};
