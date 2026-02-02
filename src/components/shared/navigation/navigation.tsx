import { NavProps } from './types';
import { NavigationList, NavigationMenu } from './variants';

const VARIANTS = {
	menu: NavigationMenu,
	list: NavigationList,
};

export const Navigation = ({ navigationData, variant = 'menu' }: NavProps) => {
	const VariantComponent = VARIANTS[variant];

	return <VariantComponent navigationData={navigationData} />;
};
