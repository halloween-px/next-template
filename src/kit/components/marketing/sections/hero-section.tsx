import { cn } from '@/lib/utils';
import { HeroBottomAccent } from '@/kit/components/marketing/hero-bottom-accent';
import { HeroMarketingContent } from '@/kit/components/marketing/hero-marketing-content';
import { ParallaxDevIconsBackground } from '@/kit/components/marketing/parallax-dev-icons';

export function HeroSection() {
	return (
		<section className='relative isolate flex min-h-[calc(100vh-var(--height-header))] flex-col overflow-hidden pt-16 md:pt-24'>
			{/* Фон: мягкие пятна + сетка */}
			<div
				className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.22),transparent)]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-border to-transparent'
				aria-hidden
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-0 -z-10 opacity-[0.35]',
					'bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]',
					'bg-size-[4rem_4rem]'
				)}
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -right-24 top-24 -z-10 size-112 rounded-full bg-primary/15 blur-3xl md:size-144'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -left-32 bottom-0 -z-10 size-88 rounded-full bg-violet-500/10 blur-3xl md:size-112'
				aria-hidden
			/>

			{/* Иконки поверх базового фона, под контентом секции */}
			<ParallaxDevIconsBackground />

			<div className='relative z-20 flex min-h-0 flex-1 flex-col justify-center pb-10 md:pb-14'>
				<HeroMarketingContent />
			</div>

			<HeroBottomAccent />
		</section>
	);
}
