import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
	variant?:
		| 'gradient-muted'
		| 'gradient-primary'
		| 'grid'
		| 'dots'
		| 'orbs'
		| 'orbs-animated'
		| 'clean'
		| 'gradient-multi'
		| 'orbs-pprimary';
	className?: string;
}

export const SectionBackground = ({ variant = 'clean', className }: SectionBackgroundProps) => {
	return (
		<div className={cn('absolute inset-0 z-[-1] overflow-hidden', className)}>
			{/* Gradient with muted background */}
			{variant === 'gradient-muted' && (
				<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background' />
			)}

			{/* Gradient with primary accent */}
			{variant === 'gradient-primary' && (
				<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background' />
			)}

			{/* Grid pattern background */}
			{variant === 'grid' && (
				<>
					<div className='absolute inset-0 opacity-20'>
						<div
							className='absolute inset-0'
							style={{
								backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
								backgroundSize: '40px 40px',
							}}
						/>
					</div>

					<div className='absolute top-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl' />
					<div className='absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl' />
				</>
			)}

			{/* Dots pattern background */}
			{variant === 'dots' && (
				<>
					<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background' />
					<div className='absolute inset-0 opacity-30'>
						<div
							className='absolute inset-0'
							style={{
								backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.2) 1px, transparent 1px)`,
								backgroundSize: '30px 30px',
							}}
						/>
					</div>
				</>
			)}

			{variant === 'orbs' && (
				<>
					<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background' />
					<div className='absolute inset-0 opacity-30'>
						<div className='absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl' />
						<div className='absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl' />
					</div>
				</>
			)}

			{variant === 'orbs-pprimary' && (
				<>
					<div className='absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
					<div className='absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl' />
				</>
			)}

			{/* Animated gradient orbs with grid */}
			{variant === 'orbs-animated' && (
				<>
					<div className='absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background' />
					<div className='absolute inset-0 -z-10'>
						<div className='absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20' />
						<div className='absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse' />
						<div
							className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse'
							style={{ animationDelay: '1s' }}
						/>
						<div
							className='absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-pulse'
							style={{ animationDelay: '2s' }}
						/>
					</div>
				</>
			)}

			{/* Multi-gradient background */}
			{variant === 'gradient-multi' && (
				<>
					<div className='absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5' />
					<div className='absolute top-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl' />
					<div className='absolute bottom-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl' />
				</>
			)}

			{/* Clean - no background decorations */}
			{variant === 'clean' && <div className='absolute inset-0 bg-background' />}
		</div>
	);
};
