import { NavGroup, NavigationVariant } from '@/components/shared/navigation/types';
import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

export type ButtonsHeader = {
	label: string;
	href: string;
	variant: VariantProps<typeof buttonVariants>['variant'];
	actions?: {
		onClick: () => void;
	};
};

export type HeaderProps = {
	linkToMain?: string;
	navigationData: NavGroup[];
	sticky?: boolean;
	navigationVariant?: NavigationVariant;
	showPhone?: boolean;
	buttons?: ButtonsHeader[];
};
