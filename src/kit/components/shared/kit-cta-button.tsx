'use client';

import Link from 'next/link';

import { Button, type ButtonProps } from '@/kit/components/ui/button';
import { SiteModalTrigger } from '@/kit/features/site-modals';
import type { SiteModalId } from '@/kit/features/site-modals';

export type KitCtaButtonProps = Omit<ButtonProps, 'asChild' | 'children'> & {
	href: string;
	label: string;
	modal?: SiteModalId;
};

/** Кнопка CTA: ссылка или открытие модалки из `DEFAULT_SITE_MODALS`. */
export function KitCtaButton({
	href,
	label,
	modal,
	variant = 'default',
	size = 'default',
	...rest
}: KitCtaButtonProps) {
	if (modal) {
		return (
			<SiteModalTrigger modalId={modal} variant={variant} size={size} {...rest}>
				{label}
			</SiteModalTrigger>
		);
	}

	return (
		<Button variant={variant} size={size} asChild {...rest}>
			<Link href={href}>{label}</Link>
		</Button>
	);
}
