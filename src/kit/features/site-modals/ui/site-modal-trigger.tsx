'use client';

import { Button } from '@/kit/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

import type { SiteModalId } from '../config/site-modals-registry';
import { useSiteModalStore } from '../model/site-modal-store';

export type SiteModalTriggerProps = Omit<ComponentProps<typeof Button>, 'onClick'> & {
	modalId: SiteModalId;
	onClick?: ComponentProps<typeof Button>['onClick'];
};

/** Кнопка, открывающая модалку из реестра `DEFAULT_SITE_MODALS` / overrides в `SiteModalProvider`. */
export function SiteModalTrigger({ modalId, className, type = 'button', ...props }: SiteModalTriggerProps) {
	const openSiteModal = useSiteModalStore((s) => s.openSiteModal);
	const { onClick: onClickProp, ...rest } = props;

	return (
		<Button
			type={type}
			className={cn(className)}
			onClick={(e) => {
				onClickProp?.(e);
				openSiteModal(modalId);
			}}
			{...rest}
		/>
	);
}
