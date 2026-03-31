'use client';

import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { useAnchorNavigation } from '@/hooks/useAnchorNavigation';

type AnchorLinkProps = LinkProps & ComponentPropsWithoutRef<'a'>;

export function AnchorLink({ href, onClick, ...props }: AnchorLinkProps) {
	const navigate = useAnchorNavigation();
	const h = typeof href === 'string' ? href : '';

	return (
		<Link
			href={href}
			onClick={(e) => {
				if (h && (h.startsWith('#') || (h.startsWith('/') && h.includes('#')))) {
					navigate(e, h);
				}
				onClick?.(e);
			}}
			{...props}
		/>
	);
}
