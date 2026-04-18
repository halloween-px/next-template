'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/kit/components/ui/dialog';
import { LeadShortForm } from '@/kit/components/forms/lead-short-form';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

import {
	DEFAULT_SITE_MODALS,
	type SiteModalDefinition,
	type SiteModalId,
} from '../config/site-modals-registry';
import { useSiteModalSurfaceStore } from '../model/site-modal-surface-store';
import { useSiteModalStore } from '../model/site-modal-store';

type SiteModalProviderProps = {
	/** Переопределение дефолтных текстов и `submitSource` под проект */
	modals?: Partial<Record<SiteModalId, Partial<SiteModalDefinition>>>;
};

export function SiteModalProvider({ modals: overrides }: SiteModalProviderProps) {
	const openId = useSiteModalStore((s) => s.openId);
	const closeSiteModal = useSiteModalStore((s) => s.closeSiteModal);
	const snapshot = useSiteModalSurfaceStore((s) => s.snapshot);
	const { resolvedTheme } = useTheme();

	const resolved = openId ? mergeModalDefinition(DEFAULT_SITE_MODALS[openId], overrides?.[openId]) : null;

	const themeShell = snapshot
		? snapshot.contentClassName
		: cn(resolvedTheme === 'dark' && 'dark');

	const overlayClassName =
		snapshot?.overlayClassName ??
		'bg-black/45 backdrop-blur-sm supports-[backdrop-filter]:bg-black/35 dark:bg-black/60';

	const surfaceProps = snapshot
		? {
				'data-site-base': snapshot['data-site-base'],
				'data-site-accent': snapshot['data-site-accent'],
				'data-site-chart': snapshot['data-site-chart'],
				'data-site-style': snapshot['data-site-style'],
						style: { fontFamily: snapshot.fontFamily },
			}
		: {};

	return (
		<Dialog
			open={Boolean(openId)}
			onOpenChange={(next) => {
				if (!next) closeSiteModal();
			}}>
			{resolved ? (
				<DialogContent
					showCloseButton
					overlayClassName={overlayClassName}
					className={cn(
						'gap-0 overflow-hidden border-0 p-0 shadow-none ring-0',
						'flex max-h-[min(92vh,52rem)] flex-col',
						'sm:max-w-lg sm:rounded-2xl',
						/* оболочка темы: превью или next-themes */
						themeShell,
						'shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_28px_70px_-14px_rgba(0,0,0,0.65)]',
						'outline-1 -outline-offset-1 outline-border/60',
						'data-[state=open]:animate-in data-[state=closed]:animate-out',
					)}
					{...surfaceProps}>
					<div
						className={cn(
							'relative shrink-0 overflow-hidden px-6 pt-7 pb-5',
							'border-b border-border/40',
							'bg-linear-to-br from-primary/9 via-muted/40 to-muted/10',
							'dark:from-primary/14 dark:via-muted/25 dark:to-muted/5',
						)}>
						<div
							className='pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-transparent via-primary to-transparent opacity-90'
							aria-hidden
						/>
						<DialogHeader className='gap-2 space-y-0 text-left'>
							<DialogTitle className='pr-10 text-xl font-semibold tracking-tight text-foreground'>
								{resolved.title}
							</DialogTitle>
							{resolved.description ? (
								<DialogDescription className='text-left text-[15px] leading-relaxed text-muted-foreground'>
									{resolved.description}
								</DialogDescription>
							) : (
								<DialogDescription className='sr-only'>{resolved.title}</DialogDescription>
							)}
						</DialogHeader>
					</div>

					<div
						className={cn(
							'min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 [scrollbar-gutter:stable]',
							'bg-muted/25 dark:bg-muted/15',
						)}>
						<LeadShortForm
							variant='plain'
							hideHeading
							copy={resolved.formCopy}
							submitContext={{ source: resolved.submitSource }}
						/>
					</div>
				</DialogContent>
			) : null}
		</Dialog>
	);
}

function mergeModalDefinition(
	base: SiteModalDefinition,
	patch?: Partial<SiteModalDefinition>,
): SiteModalDefinition {
	if (!patch) return base;
	return {
		...base,
		...patch,
		formCopy: { ...base.formCopy, ...patch.formCopy },
	};
}
