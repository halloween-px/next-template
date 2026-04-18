'use client';

import { Link } from '@/kit/components/ui/link';
import { SiteModalTrigger } from '@/kit/features/site-modals';
import type { SiteModalId } from '@/kit/features/site-modals';

type Props = {
	href: string;
	label: string;
	modal?: SiteModalId;
	className?: string;
};

/** Текстовая ссылка или открытие модалки (about, вторичные CTA). */
export function KitCtaTextLink({ href, label, modal, className }: Props) {
	if (modal) {
		return (
			<SiteModalTrigger modalId={modal} variant='link' className={className}>
				{label}
			</SiteModalTrigger>
		);
	}

	return (
		<Link href={href} className={className}>
			{label}
		</Link>
	);
}
