import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionTitleProps {
	isBadge?: boolean;
	BadgeIcon?: ReactNode;
	title: string;
	subtitle?: string;
	description?: string;
	align?: 'left' | 'center' | 'right';
	className?: string;
}

const alignmentClasses = {
	left: 'text-left items-start',
	center: 'text-center items-center mx-auto',
	right: 'text-right items-end ml-auto',
};

export const SectionTitle = ({
	isBadge = true,
	BadgeIcon,
	title,
	subtitle,
	description,
	align = 'center',
	className,
}: SectionTitleProps) => (
	<div className={cn('max-w-3xl flex flex-col mb-16', alignmentClasses[align], className)}>
		{isBadge && title && (
			<Badge variant='secondary' className='mb-4 px-4 py-1.5 w-fit'>
				{BadgeIcon ? BadgeIcon : <Sparkles className='w-3 h-3 mr-1.5 inline-block' />}
				{title}
			</Badge>
		)}

		{subtitle && <h2 className='text-4xl md:text-5xl font-bold mb-6 text-balance'>{subtitle}</h2>}

		{description && <p className='text-lg text-muted-foreground leading-relaxed'>{description}</p>}
	</div>
);
