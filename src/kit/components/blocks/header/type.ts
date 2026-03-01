import { NavGroup, NavigationVariant } from '@/kit/components/shared/navigation/types';
import { buttonVariants } from '@/kit/components/ui/button';
import { VariantProps } from 'class-variance-authority';

export type ButtonsHeader = {
	label: string;
	href: string;
	variant: VariantProps<typeof buttonVariants>['variant'];
	actions?: {
		onClick: () => void;
	};
};

export type THeaderProps = {
	linkToMain?: string;
	navigationData: NavGroup[];
	sticky?: boolean;
	navigationVariant?: NavigationVariant;
	showPhone?: boolean;
	buttons?: ButtonsHeader[];
};

export type THeader = {
	id: string;
	type: string;
	content: THeaderProps;
};
