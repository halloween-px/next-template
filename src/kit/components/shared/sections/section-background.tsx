import { cn } from '@/lib/utils';
import type { JSX } from 'react';

/**
 * Пресеты фона секции: бэкдроп + орнаменты по бокам.
 * Цвета строим на `var(--primary)` / `var(--border)` (oklch) — без `hsl(var(--primary) / …)`.
 */
export type SectionBackgroundVariant =
	| 'clean'
	| 'gradient-muted'
	| 'gradient-primary'
	| 'gradient-multi'
	| 'grid'
	| 'dots'
	| 'orbs'
	| 'orbs-pprimary'
	/** То же, что `orbs-pprimary` — корректное имя */
	| 'orbs-primary'
	| 'orbs-animated'
	| /** Крупные размытые круги слева и справа */ 'sides-circles'
	| /** Мягкие «плитки» / скошенные квадраты по краям */ 'sides-squares'
	| /** Свечение от левого и правого края */ 'sides-shine'
	| /** Сетка + боковые круги */ 'sides-grid';

type SectionBackgroundProps = {
	variant?: SectionBackgroundVariant;
	className?: string;
};

const meshMask = '[mask-image:radial-gradient(ellipse_85%_60%_at_50%_45%,#000_55%,transparent_110%)]';

const BaseGradient = () => (
	<div className='absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background' />
);

const NoiseOverlay = () => (
	<div
		aria-hidden
		className='pointer-events-none absolute inset-0 opacity-[0.06]'
		style={{
			backgroundImage:
				"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E\")",
			backgroundRepeat: 'repeat',
		}}
	/>
);

/** Линии сетки — color-mix с `--border`, без hsl(). */
const GridLines = ({ className }: { className?: string }) => {
	const line = 'color-mix(in oklab, var(--border) 58%, transparent)';
	return (
		<div
			aria-hidden
			className={cn('absolute inset-0 opacity-[0.28]', meshMask, className)}
			style={{
				backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
				backgroundSize: '4rem 4rem',
			}}
		/>
	);
};

/** Точки — color-mix с `--primary`. */
const DotPattern = ({ className }: { className?: string }) => {
	const dot = 'color-mix(in oklab, var(--primary) 32%, transparent)';
	return (
		<div
			aria-hidden
			className={cn('absolute inset-0 opacity-[0.35]', meshMask, className)}
			style={{
				backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1px)`,
				backgroundSize: '28px 28px',
			}}
		/>
	);
};

/** Мягкие «пятна» вместо градиентов на hsl(var(--primary)). */
const MeshPrimary = () => (
	<>
		<div className='absolute inset-0 bg-background' />
		<div className='absolute -top-36 left-[min(10%,96px)] size-[min(520px,85vw)] rounded-full bg-primary/14 blur-[110px]' />
		<div className='absolute top-[6%] right-[min(6%,72px)] size-[min(440px,72vw)] rounded-full bg-accent/12 blur-[100px]' />
		<div className='absolute bottom-0 left-1/2 h-[360px] w-[min(92vw,760px)] -translate-x-1/2 translate-y-[42%] rounded-full bg-muted/35 blur-[100px]' />
	</>
);

const MeshMulti = () => (
	<>
		<div className='absolute inset-0 bg-background' />
		<div className='absolute -top-28 left-[18%] size-[min(480px,78vw)] rounded-full bg-primary/13 blur-[105px]' />
		<div className='absolute bottom-[8%] right-[12%] size-[min(520px,82vw)] rounded-full bg-accent/14 blur-[115px]' />
		<div className='absolute top-[42%] left-[55%] size-[min(320px,48vw)] -translate-x-1/2 rounded-full bg-primary/8 blur-[90px]' />
	</>
);

/** Боковые круги (орбы). */
const SidesCircles = () => (
	<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
		<div className='absolute -left-[min(28%,200px)] top-[20%] size-[min(520px,48vw)] -translate-y-[12%] rounded-full bg-primary/16 blur-[110px]' />
		<div className='absolute -right-[min(24%,180px)] top-[58%] size-[min(480px,44vw)] -translate-y-[18%] rounded-full bg-accent/16 blur-[115px]' />
		<div className='absolute -left-[10%] bottom-[8%] size-[min(280px,36vw)] rounded-full bg-primary/10 blur-[80px]' />
	</div>
);

/** Геометрия по краям — «квадратики», лёгкий blur. */
const SidesSquares = () => (
	<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
		<div className='absolute -left-6 top-[22%] size-40 rotate-12 rounded-3xl bg-primary/14 blur-md ring-1 ring-primary/20' />
		<div className='absolute left-[6%] bottom-[18%] size-24 rotate-45 rounded-lg bg-accent/12 blur-sm' />
		<div className='absolute -right-8 bottom-[26%] size-48 -rotate-6 rounded-3xl bg-accent/15 blur-lg' />
		<div className='absolute right-[10%] top-[15%] size-20 rotate-12 rounded-md bg-primary/10 blur-sm' />
	</div>
);

/** Сияние от вертикальных краёв секции. */
const SidesShine = () => (
	<div aria-hidden className='pointer-events-none absolute inset-0 overflow-hidden'>
		<div className='absolute inset-y-0 left-0 w-[min(42%,420px)] bg-linear-to-r from-primary/22 via-primary/6 to-transparent' />
		<div className='absolute inset-y-0 right-0 w-[min(42%,420px)] bg-linear-to-l from-accent/18 via-accent/5 to-transparent' />
	</div>
);

const OrbsMixed = () => (
	<div aria-hidden className='pointer-events-none absolute inset-0'>
		<div className='absolute -right-10 -top-10 size-[420px] rounded-full bg-primary/20 blur-[110px]' />
		<div className='absolute -bottom-14 -left-14 size-[520px] rounded-full bg-accent/20 blur-[120px]' />
	</div>
);

const OrbsPrimarySoft = () => (
	<div aria-hidden className='pointer-events-none absolute inset-0'>
		<div className='absolute -right-10 -top-10 size-[480px] rounded-full bg-primary/12 blur-[120px]' />
		<div className='absolute -bottom-14 -left-14 size-[520px] rounded-full bg-accent/12 blur-[120px]' />
	</div>
);

const AnimatedOrbs = () => (
	<div aria-hidden className='absolute inset-0'>
		<GridLines />
		<div className='absolute left-1/4 top-1/4 size-[520px] rounded-full bg-primary/20 blur-[130px] motion-safe:animate-pulse' />
		<div
			className='absolute bottom-1/4 right-1/4 size-[420px] rounded-full bg-accent/20 blur-[110px] motion-safe:animate-pulse'
			style={{ animationDelay: '900ms' }}
		/>
		<div
			className='absolute right-[30%] top-[46%] size-[320px] rounded-full bg-primary/12 blur-[90px] motion-safe:animate-pulse'
			style={{ animationDelay: '1800ms' }}
		/>
	</div>
);

const orbsPrimaryBlocks = (
	<>
		<BaseGradient />
		<OrbsPrimarySoft />
		<NoiseOverlay />
	</>
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
			<MeshPrimary />
			<NoiseOverlay />
		</>
	),

	'gradient-multi': (
		<>
			<MeshMulti />
			<NoiseOverlay />
		</>
	),

	grid: (
		<>
			<BaseGradient />
			<GridLines />
			<div className='absolute left-16 top-40 size-72 rounded-full bg-primary/10 blur-3xl' />
			<div className='absolute bottom-44 right-16 size-96 rounded-full bg-accent/10 blur-3xl' />
			<NoiseOverlay />
		</>
	),

	dots: (
		<>
			<BaseGradient />
			<DotPattern />
			<div className='absolute -top-10 left-10 size-72 rounded-full bg-primary/10 blur-3xl' />
			<div className='absolute -bottom-10 right-10 size-96 rounded-full bg-accent/10 blur-3xl' />
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

	'orbs-pprimary': orbsPrimaryBlocks,

	'orbs-primary': orbsPrimaryBlocks,

	'orbs-animated': (
		<>
			<BaseGradient />
			<AnimatedOrbs />
			<NoiseOverlay />
		</>
	),

	'sides-circles': (
		<>
			<BaseGradient />
			<SidesCircles />
			<NoiseOverlay />
		</>
	),

	'sides-squares': (
		<>
			<BaseGradient />
			<SidesSquares />
			<NoiseOverlay />
		</>
	),

	'sides-shine': (
		<>
			<BaseGradient />
			<SidesShine />
			<NoiseOverlay />
		</>
	),

	'sides-grid': (
		<>
			<BaseGradient />
			<GridLines />
			<SidesCircles />
			<NoiseOverlay />
		</>
	),
};

/** Подписи для будущих селекторов в билдере / теме */
export const SECTION_BACKGROUND_LABELS: Record<SectionBackgroundVariant, string> = {
	clean: 'Без декора',
	'gradient-muted': 'Градиент muted',
	'gradient-primary': 'Мягкие пятна primary',
	'gradient-multi': 'Многослойное свечение',
	grid: 'Сетка + орбы',
	dots: 'Точки + орбы',
	orbs: 'Орбы mixed',
	'orbs-pprimary': 'Орбы primary (мягко)',
	'orbs-primary': 'Орбы primary (мягко)',
	'orbs-animated': 'Орбы с пульсацией',
	'sides-circles': 'По бокам: круги',
	'sides-squares': 'По бокам: квадраты',
	'sides-shine': 'По бокам: сияние',
	'sides-grid': 'Сетка и круги по краям',
};

export const SectionBackground = ({ variant = 'clean', className }: SectionBackgroundProps) => {
	const v = variant in VARIANTS ? variant : 'clean';
	return (
		<div className={cn('absolute inset-0 z-[-1] overflow-hidden', className)}>
			{VARIANTS[v] ?? VARIANTS.clean}
		</div>
	);
};
