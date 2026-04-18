'use client';

import { Button } from '@/kit/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronDown,
	ChevronRight,
	Copy,
	Minus,
	MoreHorizontal,
	Plus,
	Search,
	Settings,
	ShoppingBag,
	Sun,
	Trash2,
	Upload,
} from 'lucide-react';

const iconButtons = [
	Copy,
	AlertCircle,
	Trash2,
	Upload,
	ShoppingBag,
	MoreHorizontal,
	Sun,
	Plus,
	Minus,
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronDown,
	ChevronRight,
	Search,
	Settings,
] as const;

export function LucideIconToolbarCard() {
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle className='text-base'>Иконки</CardTitle>
				<CardDescription>Outline-кнопки с lucide</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-wrap gap-2'>
					{iconButtons.map((Icon, i) => (
						<Button
							key={i}
							variant='outline'
							size='icon'
							className='size-11 shrink-0 border-border/60 bg-background/50'
							aria-label={`icon-${i}`}>
							<Icon className='size-4' />
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
