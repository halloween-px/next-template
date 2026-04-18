'use client';

import Link from 'next/link';
import type { NavGroup } from '@/kit/components/shared/navigation/types';
import { cn } from '@/lib/utils';

/** Один верхний пункт = один якорь на секцию (`NavGroup.href`), без выпадающих меню. */
export function NavigationBarFlat({
	navigationData,
	className,
}: {
	navigationData: NavGroup[];
	className?: string;
}) {
	return (
		<nav
			className={cn(
				'hidden flex-1 items-center justify-center gap-x-8 gap-y-2 md:flex lg:gap-x-10',
				className,
			)}>
			{navigationData.map((group) => {
				const href = group.href ?? group.items[0]?.href ?? '#';
				return (
					<Link
						key={group.title}
						href={href}
						className='text-sm font-medium text-foreground/90 transition-colors hover:text-primary'>
						{group.title}
					</Link>
				);
			})}
		</nav>
	);
}
