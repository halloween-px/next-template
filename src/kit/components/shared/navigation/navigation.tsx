import { NavProps } from './types';
import { NavigationList, NavigationMenu } from './variants';

const VARIANTS = {
	menu: NavigationMenu,
	list: NavigationList,
};

export const Navigation = ({ navigationData, variant = 'menu', className }: NavProps) => {
	const VariantComponent = VARIANTS[variant];

	return (
		VariantComponent && <VariantComponent navigationData={navigationData} className={className} />
	);
};
