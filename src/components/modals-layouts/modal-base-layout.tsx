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
	'3xl': 'sm:max-w-3xl',
	'4xl': 'sm:max-w-4xl',
	'5xl': 'sm:max-w-5xl',
	'6xl': 'sm:max-w-6xl 2xl:max-w-7xl',
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
					/* До xl — как на ~14": ограничение по высоте и скролл тела. От xl — почти вся высота экрана, без искусственного потолка 52rem. */
					'flex max-h-[min(92dvh,52rem)] flex-col xl:max-h-[calc(100dvh-2rem)]',
					'rounded-2xl border border-border/70 bg-background',
					'shadow-xl shadow-black/[0.07] ring-1 ring-border/40 dark:shadow-black/30 dark:ring-white/6',
					'data-[state=open]:animate-in data-[state=closed]:animate-out',
					sizeClassName[size],
					className
				)}>
				<div className='relative shrink-0 border-b border-border/70 bg-muted/35 px-6 pt-6 pb-5'>
					<DialogHeader className='gap-1.5 space-y-0 text-left'>
						<DialogTitle className='pr-10 text-xl font-semibold tracking-tight text-foreground'>
							{title}
						</DialogTitle>
						{description ? (
							<DialogDescription className='text-left text-sm leading-relaxed text-muted-foreground'>
								{description}
							</DialogDescription>
						) : (
							<DialogDescription className='sr-only'>{title}</DialogDescription>
						)}
					</DialogHeader>
				</div>

				<div
					className={cn(
						'min-h-0 flex-1 overflow-y-auto overscroll-contain bg-muted/15 px-6 py-6',
						'[scrollbar-gutter:stable] xl:[scrollbar-gutter:auto]',
					)}>
					{children}
				</div>
			</DialogContent>
		</Dialog>
	);
}
