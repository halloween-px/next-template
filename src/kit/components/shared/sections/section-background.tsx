import { cn } from '@/lib/utils';
import { JSX } from 'react';

type SectionBackgroundVariant =
	| 'gradient-muted'
	| 'gradient-primary'
	| 'grid'
	| 'dots'
	| 'orbs'
	| 'orbs-animated'
	| 'clean'
	| 'gradient-multi'
	| 'orbs-pprimary';

/**
 * Visual preset for section background.
 */
type SectionBackgroundProps = {
	/** Visual preset for section background */
	variant?: SectionBackgroundVariant;
	className?: string;
};

const BaseGradient = () => (
	<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background' />
);

const NoiseOverlay = () => (
	<div
		aria-hidden
		className='absolute inset-0 opacity-[0.06] pointer-events-none'
		style={{
			backgroundImage:
				"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E\")",
			backgroundRepeat: 'repeat',
		}}
	/>
);

const GridLayer = () => (
	<div
		aria-hidden
		className='absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_80%_55%_at_50%_40%,#000_60%,transparent_110%)]'
		style={{
			backgroundImage:
				'linear-gradient(to_right,hsl(var(--border)/0.55)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.55)_1px,transparent_1px)',
			backgroundSize: '4rem 4rem',
		}}
	/>
);

const DotsLayer = () => (
	<div
		aria-hidden
		className='absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_80%_55%_at_50%_40%,#000_55%,transparent_110%)]'
		style={{
			backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.25) 1px, transparent 1px)`,
			backgroundSize: '28px 28px',
		}}
	/>
);

const Orbs = ({ tone = 'mixed' }: { tone?: 'mixed' | 'primary' }) => {
	const primary = tone === 'primary';
	return (
		<div aria-hidden className='absolute inset-0'>
			<div
				className={cn(
					'absolute -top-10 -right-10 h-[420px] w-[420px] rounded-full blur-[110px]',
					primary ? 'bg-primary/10' : 'bg-primary/18'
					// note: tailwind doesn’t support /18; handled by explicit classes below
				)}
			/>
			<div
				className={cn(
					'absolute -bottom-14 -left-14 h-[520px] w-[520px] rounded-full blur-[120px]',
					primary ? 'bg-accent/10' : 'bg-accent/18'
				)}
			/>
		</div>
	);
};

const OrbsMixed = () => (
	<div aria-hidden className='absolute inset-0'>
		<div className='absolute -top-10 -right-10 h-[420px] w-[420px] rounded-full blur-[110px] bg-primary/20' />
		<div className='absolute -bottom-14 -left-14 h-[520px] w-[520px] rounded-full blur-[120px] bg-accent/20' />
	</div>
);

const OrbsPrimary = () => (
	<div aria-hidden className='absolute inset-0'>
		<div className='absolute -top-10 -right-10 h-[480px] w-[480px] rounded-full blur-[120px] bg-primary/10' />
		<div className='absolute -bottom-14 -left-14 h-[520px] w-[520px] rounded-full blur-[120px] bg-accent/10' />
	</div>
);

const AnimatedOrbs = () => (
	<div aria-hidden className='absolute inset-0'>
		<GridLayer />
		<div className='absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-primary/20 rounded-full blur-[130px] motion-safe:animate-pulse' />
		<div
			className='absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-accent/20 rounded-full blur-[110px] motion-safe:animate-pulse'
			style={{ animationDelay: '900ms' }}
		/>
		<div
			className='absolute top-[46%] right-[30%] w-[320px] h-[320px] bg-primary/10 rounded-full blur-[90px] motion-safe:animate-pulse'
			style={{ animationDelay: '1800ms' }}
		/>
	</div>
);

const VARIANTS: Record<SectionBackgroundVariant, JSX.Element> = {
	clean: <div className='absolute inset-0 bg-background' />,

	'gradient-muted': (
		<>
			<BaseGradient />
			<NoiseOverlay />
		</>
	),

	'gradient-primary': (
		<>
			<div className='absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_0%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(900px_circle_at_80%_10%,hsl(var(--accent)/0.10),transparent_55%),linear-gradient(to_bottom,hsl(var(--background))_0%,hsl(var(--muted)/0.25)_45%,hsl(var(--background))_100%)]' />
			<NoiseOverlay />
		</>
	),

	grid: (
		<>
			<BaseGradient />
			<GridLayer />
			<div className='absolute top-40 left-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl' />
			<div className='absolute bottom-44 right-16 w-96 h-96 bg-accent/10 rounded-full blur-3xl' />
			<NoiseOverlay />
		</>
	),

	dots: (
		<>
			<BaseGradient />
			<DotsLayer />
			<div className='absolute -top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl' />
			<div className='absolute -bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl' />
			<NoiseOverlay />
		</>
	),

	orbs: (
		<>
			<BaseGradient />
			<OrbsMixed />
			<NoiseOverlay />
		</>
	),

	'orbs-pprimary': (
		<>
			<BaseGradient />
			<OrbsPrimary />
			<NoiseOverlay />
		</>
	),

	'orbs-animated': (
		<>
			<BaseGradient />
			<AnimatedOrbs />
			<NoiseOverlay />
		</>
	),

	'gradient-multi': (
		<>
			<div className='absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(900px_circle_at_90%_60%,hsl(var(--accent)/0.12),transparent_55%),linear-gradient(to_br,hsl(var(--background))_0%,hsl(var(--primary)/0.04)_40%,hsl(var(--accent)/0.05)_100%)]' />
			<div className='absolute top-44 left-16 w-72 h-72 bg-primary/10 rounded-full blur-3xl' />
			<div className='absolute bottom-44 right-16 w-96 h-96 bg-accent/10 rounded-full blur-3xl' />
			<NoiseOverlay />
		</>
	),
};

export const SectionBackground = ({ variant = 'clean', className }: SectionBackgroundProps) => {
	return (
		<div className={cn('absolute inset-0 z-[-1] overflow-hidden', className)}>
			{VARIANTS[variant] ?? VARIANTS.clean}
		</div>
	);
};
