'use client';

import { useEffect, useState } from 'react';
import type { THeroContent } from '@/kit/components/blocks/hero/type';

type UseSliderArgs = Pick<THeroContent, 'slides' | 'autoplay' | 'interval'>;

const DEFAULT_INTERVAL_MS = 6000;

export function useSlider({ slides, autoplay, interval }: UseSliderArgs) {
	const [activeIndex, setActiveIndex] = useState(0);
	const intervalMs = interval ?? DEFAULT_INTERVAL_MS;

	const activeSlide = slides[activeIndex];

	useEffect(() => {
		setActiveIndex((i) => {
			if (slides.length === 0) return 0;
			return Math.min(i, slides.length - 1);
		});
	}, [slides.length]);

	useEffect(() => {
		if (!autoplay || slides.length <= 1) return;
		const id = window.setInterval(() => {
			setActiveIndex((i) => (i + 1) % slides.length);
		}, intervalMs);
		return () => window.clearInterval(id);
	}, [autoplay, slides.length, intervalMs]);

	return {
		activeIndex,
		setActiveIndex,
		activeSlide,
	};
}
