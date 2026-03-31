'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, type MouseEvent } from 'react';

function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Плавный скролл к якорю: #id, /#id, /path#id — без полной перезагрузки.
 */
export function useAnchorNavigation() {
	const router = useRouter();
	const pathname = usePathname();

	return useCallback(
		(e: MouseEvent<HTMLAnchorElement>, href: string) => {
			if (!href || href === '#') return;
			if (
				href.startsWith('http://') ||
				href.startsWith('https://') ||
				href.startsWith('mailto:') ||
				href.startsWith('tel:')
			) {
				return;
			}

			const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

			if (href.startsWith('#')) {
				e.preventDefault();
				const el = document.querySelector(href);
				el?.scrollIntoView({ behavior, block: 'start' });
				window.history.replaceState(null, '', href);
				return;
			}

			const hashIdx = href.indexOf('#');
			if (hashIdx === -1) return;

			const url = new URL(href, window.location.origin);
			const hash = href.slice(hashIdx);
			const here = `${pathname}${window.location.search}`;
			const there = `${url.pathname}${url.search}`;

			if (here === there) {
				e.preventDefault();
				const id = decodeURIComponent(hash.slice(1));
				const el = document.getElementById(id);
				el?.scrollIntoView({ behavior, block: 'start' });
				window.history.replaceState(null, '', url.pathname + url.search + hash);
				return;
			}

			e.preventDefault();
			router.push(href);
		},
		[pathname, router],
	);
}
