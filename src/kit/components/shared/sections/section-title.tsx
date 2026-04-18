import { Badge } from '@/kit/components/ui/badge';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

export type SectionTitleVariant =
	| 'default'
	| 'minimal'
	| 'rail'
	| 'underline'
	| 'pill'
	| 'dot';

interface SectionTitleProps {
	variant?: SectionTitleVariant;
	isBadge?: boolean;
	BadgeIcon?: ReactNode;
	title: string;
	subtitle?: string;
	description?: string;
	align?: 'left' | 'center' | 'right';
	/** Параграф описания; по умолчанию как `align`. */
	descriptionAlign?: 'left' | 'center' | 'right';
	className?: string;
}

const alignmentClasses = {
	left: 'text-left items-start',
	center: 'text-center items-center mx-auto',
	right: 'text-right items-end ml-auto',
};

const underlineAccentAlign = {
	left: 'mr-auto',
	center: 'mx-auto',
	right: 'ml-auto',
};

export const SectionTitle = ({
	variant = 'default',
	isBadge = true,
	BadgeIcon,
	title,
	subtitle,
	description,
	align = 'center',
	descriptionAlign: descriptionAlignProp,
	className,
}: SectionTitleProps) => {
	const v = variant;
	const descAlign = descriptionAlignProp ?? align;
	const showEyebrow = Boolean(title && isBadge);

	const eyebrowMinimal = showEyebrow && (v === 'minimal' || v === 'rail') && (
		<Typography.Text
			size='xs'
			weight='semibold'
			align={align}
			className='mb-4 uppercase tracking-widest text-primary'>
			{title}
		</Typography.Text>
	);

	const eyebrowPill =
		showEyebrow &&
		v === 'pill' && (
			<Typography.Text
				size='xs'
				weight='semibold'
				align={align}
				className='mb-4 inline-block rounded-full border border-border bg-muted/70 px-4 py-1.5 uppercase tracking-wider text-primary'>
				{title}
			</Typography.Text>
		);

	const dotRowAlign = {
		left: 'justify-start',
		center: 'justify-center',
		right: 'justify-end',
	} as const;

	const eyebrowDot =
		showEyebrow &&
		v === 'dot' && (
			<div
				className={cn('mb-4 flex flex-wrap items-center gap-3', dotRowAlign[align])}>
				<span className='h-2 w-2 shrink-0 rounded-full bg-primary' aria-hidden />
				<Typography.Text size='xs' weight='semibold' className='uppercase tracking-widest text-primary'>
					{title}
				</Typography.Text>
			</div>
		);

	const eyebrowUnderline = showEyebrow && v === 'underline' && (
		<>
			<Typography.Text
				size='xs'
				weight='semibold'
				align={align}
				className='mb-2 uppercase tracking-widest text-primary'>
				{title}
			</Typography.Text>
			<div
				className={cn('h-0.5 w-14 rounded-full bg-primary mb-4', underlineAccentAlign[align])}
				aria-hidden
			/>
		</>
	);

	const eyebrowDefault = showEyebrow && v === 'default' && (
		<Badge variant='secondary' className='mb-4 px-4 py-1.5 w-fit'>
			{BadgeIcon ? BadgeIcon : <Sparkles className='w-3 h-3 mr-1.5 inline-block' />}
			{title}
		</Badge>
	);

	const headingBlock = (
		<>
			{eyebrowDefault}
			{eyebrowMinimal}
			{eyebrowPill}
			{eyebrowDot}
			{eyebrowUnderline}

			{subtitle ? (
				<Typography.Title level={2} align={align} className='mb-4'>
					{subtitle}
				</Typography.Title>
			) : null}

			{description ? (
				<Typography.Text align={descAlign} color='muted' size='lg'>
					{description}
				</Typography.Text>
			) : null}
		</>
	);

	if (v === 'rail') {
		return (
			<div className={cn('max-w-3xl flex gap-6 lg:gap-8 mb-16', alignmentClasses[align], className)}>
				<div
					className='mt-2 w-1.5 shrink-0 self-stretch min-h-[5rem] rounded-full bg-gradient-to-b from-primary via-primary/70 to-accent'
					aria-hidden
				/>
				<div className='flex min-w-0 flex-col'>{headingBlock}</div>
			</div>
		);
	}

	return (
		<div className={cn('max-w-3xl flex flex-col mb-16', alignmentClasses[align], className)}>
			{headingBlock}
		</div>
	);
};
