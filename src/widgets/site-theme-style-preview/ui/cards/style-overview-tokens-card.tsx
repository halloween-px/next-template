'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';

const paletteRow1 = [
	{ label: '--background', className: 'bg-background border border-border' },
	{ label: '--foreground', className: 'bg-foreground' },
	{ label: '--primary', className: 'bg-primary' },
	{ label: '--secondary', className: 'bg-secondary' },
	{ label: '--muted', className: 'bg-muted' },
	{ label: '--accent', className: 'bg-accent' },
] as const;

const paletteRow2 = [
	{ label: '--border', className: 'border-2 border-border bg-transparent' },
	{ label: '--chart-1', className: 'bg-chart-1' },
	{ label: '--chart-2', className: 'bg-chart-2' },
	{ label: '--chart-3', className: 'bg-chart-3' },
	{ label: '--chart-4', className: 'bg-chart-4' },
	{ label: '--chart-5', className: 'bg-chart-5' },
] as const;

function TokenSwatch({ label, className }: { label: string; className: string }) {
	return (
		<div className='flex min-w-0 flex-col gap-1.5'>
			<div className={cn('h-10 w-full rounded-md', className)} />
			<code className='truncate font-mono text-[10px] leading-tight text-muted-foreground'>
				{label}
			</code>
		</div>
	);
}

export function StyleOverviewTokensCard() {
	return (
		<Card className='border-border/60 bg-card'>
			<CardHeader>
				<CardTitle>Style Overview</CardTitle>
				<CardDescription>
					Designers love packing quirky glyphs into test phrases. This is a preview of the typography
					styles.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
					{paletteRow1.map((t) => (
						<TokenSwatch key={t.label} label={t.label} className={t.className} />
					))}
				</div>
				<div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
					{paletteRow2.map((t) => (
						<TokenSwatch key={t.label} label={t.label} className={t.className} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
