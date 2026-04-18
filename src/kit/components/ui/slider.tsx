'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const thumbCount = Array.isArray(value) ? value.length : Array.isArray(defaultValue) ? defaultValue.length : 1;

	return (
		<SliderPrimitive.Root
			data-slot='slider'
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
				className,
			)}
			{...props}>
			<SliderPrimitive.Track
				data-slot='slider-track'
				className='bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full'>
				<SliderPrimitive.Range data-slot='slider-range' className='bg-primary absolute h-full' />
			</SliderPrimitive.Track>
			{Array.from({ length: thumbCount }).map((_, i) => (
				<SliderPrimitive.Thumb
					key={i}
					data-slot='slider-thumb'
					className='border-primary ring-ring/50 block size-4 rounded-full border bg-background shadow-sm transition-colors focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
