'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/kit/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ModalId, ModalSize } from '@/stores/modal-store';
import { useModalStore } from '@/stores/modal-store';
import type { ReactNode } from 'react';

const sizeClassName: Record<ModalSize, string> = {
	sm: 'sm:max-w-sm',
	md: 'sm:max-w-md',
	lg: 'sm:max-w-lg',
	xl: 'sm:max-w-xl',
	'2xl': 'sm:max-w-2xl',
	'5xl': 'sm:max-w-5xl',
};

type ModalBaseLayoutProps = {
	modalId: ModalId;
	title: string;
	description?: string;
	size?: ModalSize;
	children: ReactNode;
	className?: string;
};

export function ModalBaseLayout({
	modalId,
	title,
	description,
	size = 'lg',
	children,
	className,
}: ModalBaseLayoutProps) {
	const modals = useModalStore((s) => s.modals);
	const closeModal = useModalStore((s) => s.closeModal);
	const isOpen = modals.some((m) => m.id === modalId);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(next) => {
				if (!next) closeModal(modalId);
			}}>
			<DialogContent
				showCloseButton
				className={cn(
					'gap-0 overflow-hidden p-0',
					'flex max-h-[min(92vh,52rem)] flex-col',
					'rounded-xl border border-border/80 bg-background',
					'shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:bg-background dark:shadow-black/40 dark:ring-white/10',
					'data-[state=open]:animate-in data-[state=closed]:animate-out',
					sizeClassName[size],
					className
				)}>
				<div className='relative shrink-0 border-b border-border/60 bg-linear-to-b from-muted/50 to-muted/10 px-6 pt-6 pb-4'>
					<div
						className='pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-[inherit] bg-linear-to-r from-primary/70 via-primary to-primary/70'
						aria-hidden
					/>
					<DialogHeader className='gap-1.5 space-y-0 text-left'>
						<DialogTitle className='pr-8 text-xl font-semibold tracking-tight text-foreground'>
							{title}
						</DialogTitle>
						{description ? (
							<DialogDescription className='text-left text-[15px] leading-relaxed text-muted-foreground'>
								{description}
							</DialogDescription>
						) : (
							<DialogDescription className='sr-only'>{title}</DialogDescription>
						)}
					</DialogHeader>
				</div>

				<div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 [scrollbar-gutter:stable]'>
					{children}
				</div>
			</DialogContent>
		</Dialog>
	);
}
