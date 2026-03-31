'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/kit/components/ui/button';
import { VariantProps } from 'class-variance-authority';

interface LinkProps
	extends React.ComponentProps<typeof NextLink>,
		VariantProps<typeof buttonVariants> {
	hideOnCurrent?: boolean;
}

export const Link = ({
	href,
	children,
	className,
	variant,
	size,
	hideOnCurrent = true,
	...props
}: LinkProps) => {
	const pathname = usePathname() ?? '';
	const projectMatch = pathname.match(/^(\/template\/project\/[^/]+)/);
	const projectBase = projectMatch?.[1] ?? null;

	const isBuilder = pathname.startsWith('/template');

	let cleanPathname = pathname;
	if (projectBase) {
		cleanPathname = pathname.slice(projectBase.length) || '/';
	} else if (isBuilder) {
		cleanPathname = pathname.replace('/template', '') || '/';
	}

	const strHref = href.toString();
	const isCurrentPage = cleanPathname === strHref;

	const noPadding = variant === 'link' && 'p-0';

	let finalHref = href;
	if (isBuilder && strHref.startsWith('/')) {
		if (projectBase && strHref.startsWith(projectBase)) {
			finalHref = strHref;
		} else {
			finalHref = projectBase ? `${projectBase}${strHref}` : `/template${strHref}`;
		}
	}

	if (isCurrentPage && hideOnCurrent && isBuilder) {
		return null;
	}

	return (
		<NextLink
			href={finalHref}
			className={cn(buttonVariants({ variant, size, className }), noPadding)}
			{...props}>
			{children}
		</NextLink>
	);
};
