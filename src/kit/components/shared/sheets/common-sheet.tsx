'use client';

import { Button } from '@/kit/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/kit/components/ui/sheet';
import { VariantProps } from 'class-variance-authority';
import { Children, isValidElement, ReactNode, useState } from 'react';

type TCommonSheetTrigger = {
	children: React.ReactNode;
	className?: string;
	isButton?: boolean;
};

type TCommonSheetContent = {
	children: React.ReactNode;
	className?: string;
	position?: VariantProps<typeof SheetContent>['side'];
};

type TCommonSheet = {
	children: React.ReactNode;
};

const CommonSheet = ({ children }: TCommonSheet) => {
	const [isOpen, setIsOpen] = useState(false);
	let trigger: null | ReactNode = null;
	let content: null | ReactNode = null;

	Children.forEach(children, (child) => {
		if (!isValidElement(child)) return;

		if (!trigger && child.type === Trigger) {
			trigger = child;
			return;
		}

		if (!content && child.type === Content) {
			content = child;
		}
	});

	if (!trigger || !content) return null;

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			{trigger}
			{content}
		</Sheet>
	);
};

export const Trigger = ({ children, isButton, className }: TCommonSheetTrigger) => {
	return (
		<SheetTrigger asChild className={className}>
			{isButton ? (
				<Button variant='ghost' size='icon'>
					{children}
				</Button>
			) : (
				<>{children}</>
			)}
		</SheetTrigger>
	);
};
Trigger.displayName = 'CommonSheetTrigger';

export const Content = ({ children, position = 'right' }: TCommonSheetContent) => {
	return <SheetContent side={position}>{children}</SheetContent>;
};
Content.displayName = 'CommonSheetContent';

CommonSheet.Trigger = Trigger;
CommonSheet.Content = Content;

export { CommonSheet };
