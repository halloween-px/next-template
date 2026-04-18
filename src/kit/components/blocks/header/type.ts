import type { SiteCompanyInfo } from '@/types/site-company-info';
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
	navigationData?: NavGroup[];
	/** `true` — прилипает к верху колонки сайта (`sticky`), ширина как у превью / zoom, не на весь viewport. */
	sticky?: boolean;
	navigationVariant?: NavigationVariant;
	showPhone?: boolean;
	buttons?: ButtonsHeader[];
	/** Подставляется из `SiteConfig.companyInfo` в рендерере (хедер с контактами). */
	companyInfo?: SiteCompanyInfo;
};

export type THeader = {
	id: string;
	type: string;
	content: THeaderProps;
};
