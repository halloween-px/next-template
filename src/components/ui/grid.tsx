import type React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
	children: React.ReactNode;
	cols?: 1 | 2 | 3 | 4 | 5 | 6;
	sm?: 1 | 2 | 3 | 4 | 5 | 6;
	md?: 1 | 2 | 3 | 4 | 5 | 6;
	lg?: 1 | 2 | 3 | 4 | 5 | 6;
	xl?: 1 | 2 | 3 | 4 | 5 | 6;
	gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

const gapMap = {
	none: 'gap-0',
	sm: 'gap-4',
	md: 'gap-6',
	lg: 'gap-8',
	xl: 'gap-12',
};

const colsMap = {
	1: 'grid-cols-1',
	2: 'grid-cols-2',
	3: 'grid-cols-3',
	4: 'grid-cols-4',
	5: 'grid-cols-5',
	6: 'grid-cols-6',
};

const smColsMap = {
	1: 'sm:grid-cols-1',
	2: 'sm:grid-cols-2',
	3: 'sm:grid-cols-3',
	4: 'sm:grid-cols-4',
	5: 'sm:grid-cols-5',
	6: 'sm:grid-cols-6',
};

const mdColsMap = {
	1: 'md:grid-cols-1',
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4',
	5: 'md:grid-cols-5',
	6: 'md:grid-cols-6',
};

const lgColsMap = {
	1: 'lg:grid-cols-1',
	2: 'lg:grid-cols-2',
	3: 'lg:grid-cols-3',
	4: 'lg:grid-cols-4',
	5: 'lg:grid-cols-5',
	6: 'lg:grid-cols-6',
};

const xlColsMap = {
	1: 'xl:grid-cols-1',
	2: 'xl:grid-cols-2',
	3: 'xl:grid-cols-3',
	4: 'xl:grid-cols-4',
	5: 'xl:grid-cols-5',
	6: 'xl:grid-cols-6',
};

export function Grid({ children, cols = 1, sm, md, lg, xl, gap = 'md', className }: GridProps) {
	return (
		<div
			className={cn(
				'grid',
				colsMap[cols],
				sm && smColsMap[sm],
				md && mdColsMap[md],
				lg && lgColsMap[lg],
				xl && xlColsMap[xl],
				gapMap[gap],
				className
			)}>
			{children}
		</div>
	);
}

interface GridItemProps {
	children: React.ReactNode;
	span?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
	smSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
	mdSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
	lgSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
	xlSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
	className?: string;
}

const spanMap = {
	1: 'col-span-1',
	2: 'col-span-2',
	3: 'col-span-3',
	4: 'col-span-4',
	5: 'col-span-5',
	6: 'col-span-6',
	full: 'col-span-full',
};

const smSpanMap = {
	1: 'sm:col-span-1',
	2: 'sm:col-span-2',
	3: 'sm:col-span-3',
	4: 'sm:col-span-4',
	5: 'sm:col-span-5',
	6: 'sm:col-span-6',
	full: 'sm:col-span-full',
};

const mdSpanMap = {
	1: 'md:col-span-1',
	2: 'md:col-span-2',
	3: 'md:col-span-3',
	4: 'md:col-span-4',
	5: 'md:col-span-5',
	6: 'md:col-span-6',
	full: 'md:col-span-full',
};

const lgSpanMap = {
	1: 'lg:col-span-1',
	2: 'lg:col-span-2',
	3: 'lg:col-span-3',
	4: 'lg:col-span-4',
	5: 'lg:col-span-5',
	6: 'lg:col-span-6',
	full: 'lg:col-span-full',
};

const xlSpanMap = {
	1: 'xl:col-span-1',
	2: 'xl:col-span-2',
	3: 'xl:col-span-3',
	4: 'xl:col-span-4',
	5: 'xl:col-span-5',
	6: 'xl:col-span-6',
	full: 'xl:col-span-full',
};

Grid.Item = function GridItem({
	children,
	span,
	smSpan,
	mdSpan,
	lgSpan,
	xlSpan,
	className,
}: GridItemProps) {
	return (
		<div
			className={cn(
				span && spanMap[span],
				smSpan && smSpanMap[smSpan],
				mdSpan && mdSpanMap[mdSpan],
				lgSpan && lgSpanMap[lgSpan],
				xlSpan && xlSpanMap[xlSpan],
				className
			)}>
			{children}
		</div>
	);
};
