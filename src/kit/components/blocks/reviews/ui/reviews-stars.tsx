import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
	rating: number;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
};

const sizeClass = {
	sm: 'h-3.5 w-3.5',
	md: 'h-4 w-4',
	lg: 'h-5 w-5',
};

export function ReviewsStars({ rating, className, size = 'md' }: Props) {
	const icon = sizeClass[size];

	return (
		<div
			className={cn('flex gap-0.5', className)}
			role='img'
			aria-label={`Оценка ${rating} из 5`}>
			{Array.from({ length: rating }).map((_, i) => (
				<Star key={i} className={cn(icon, 'fill-primary text-primary')} aria-hidden />
			))}
		</div>
	);
}
