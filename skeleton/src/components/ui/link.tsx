'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

interface LinkProps
	extends React.ComponentProps<typeof NextLink>,
		VariantProps<typeof buttonVariants> {
	hideOnCurrent?: boolean;
}

//Блок зависит от абстрактного пути @/components/ui/link. То есть нельзя использовать в других блоках, это чистая компонента для использования в клиентской части после сборки.
export const Link = ({
	href,
	children,
	className,
	variant,
	size,
	hideOnCurrent = true,
	...props
}: LinkProps) => {
	const pathname = usePathname();
	const strHref = href.toString();

	if (strHref === pathname && hideOnCurrent) {
		return null;
	}

	return (
		<NextLink href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
			{children}
		</NextLink>
	);
};
