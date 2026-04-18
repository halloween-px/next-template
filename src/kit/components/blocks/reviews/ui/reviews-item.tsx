import { Avatar, AvatarFallback, AvatarImage } from '@/kit/components/ui/avatar';
import { Card, CardContent } from '@/kit/components/ui/card';
import { TReviewsItem } from '../types';
import { ReviewsStars } from './reviews-stars';

export const ReviewsItem = ({ avatar, name, role, rating, textContent }: TReviewsItem) => {
	return (
		<Card className='h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur'>
			<CardContent className='p-8'>
				<ReviewsStars rating={rating} size='lg' className='mb-4' />
				<p className='text-lg leading-relaxed mb-6 text-foreground'>{textContent}</p>
				<div className='flex items-center gap-4'>
					<Avatar className='h-12 w-12 ring-2 ring-primary/20'>
						<AvatarImage src={avatar} alt={name} />
						<AvatarFallback>{name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<p className='font-semibold'>{name}</p>
						<p className='text-sm text-muted-foreground'>{role}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
