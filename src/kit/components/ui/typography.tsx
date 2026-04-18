import React from 'react';
import { cn } from '@/lib/utils';
import type { JSX } from 'react/jsx-runtime';

interface BaseTypographyProps {
	children: React.ReactNode;
	className?: string;
	gradient?: boolean;
	color?: 'default' | 'muted' | 'primary' | 'accent' | 'destructive';
	align?: 'left' | 'center' | 'right';
	weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

interface TitleProps extends BaseTypographyProps {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const textVariants = {
	default: '',
	/** Цитата / акцент: левая граница, курсив */
	blockquote: 'border-l-4 border-primary pl-5 italic text-foreground/90',
} as const;

interface TextProps extends BaseTypographyProps {
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
	as?: 'p' | 'span' | 'div' | 'blockquote';
	/** Визуальный пресет поверх базовых стилей текста */
	variant?: keyof typeof textVariants;
}

const colorClasses = {
	default: 'text-foreground',
	muted: 'text-muted-foreground',
	primary: 'text-primary',
	accent: 'text-accent-foreground',
	destructive: 'text-destructive',
};

const alignClasses = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
};

const weightClasses = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	extrabold: 'font-extrabold',
};

const gradientClass =
	'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent';

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
	(
		{
			level = 1,
			as,
			children,
			className,
			gradient = false,
			color = 'default',
			align = 'left',
			weight,
			...props
		},
		ref
	) => {
		const Component = as || (`h${level}` as keyof JSX.IntrinsicElements);

		const sizeClasses = {
			1: 'text-4xl md:text-5xl lg:text-6xl',
			2: 'text-3xl md:text-4xl lg:text-5xl',
			3: 'text-2xl md:text-3xl lg:text-4xl',
			4: 'text-xl md:text-2xl lg:text-3xl',
			5: 'text-lg md:text-xl lg:text-2xl',
			6: 'text-base md:text-lg lg:text-xl',
		};

		const defaultWeights = {
			1: 'font-extrabold',
			2: 'font-bold',
			3: 'font-bold',
			4: 'font-semibold',
			5: 'font-semibold',
			6: 'font-medium',
		};

		return React.createElement(
			Component,
			{
				ref,
				className: cn(
					sizeClasses[level],
					weight ? weightClasses[weight] : defaultWeights[level],
					gradient ? gradientClass : colorClasses[color],
					alignClasses[align],
					'text-balance',
					className
				),
				...props,
			},
			children
		);
	}
);
Title.displayName = 'Typography.Title';

const Text = React.forwardRef<HTMLElement, TextProps>(
	(
		{
			size = 'base',
			as,
			variant: variantProp = 'default',
			children,
			className,
			gradient = false,
			color = 'default',
			align = 'left',
			weight = 'normal',
			...props
		},
		ref
	) => {
		const variant = variantProp;
		const Component =
			as ?? (variant === 'blockquote' ? 'blockquote' : 'p');

		const sizeClasses = {
			xs: 'text-xs',
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
		};

		return React.createElement(
			Component,
			{
				ref,
				className: cn(
					sizeClasses[size],
					weightClasses[weight],
					gradient ? gradientClass : colorClasses[color],
					alignClasses[align],
					'leading-relaxed',
					textVariants[variant],
					className
				),
				...props,
			},
			children
		);
	}
);
Text.displayName = 'Typography.Text';

export const Typography = {
	Title,
	Text,
};
