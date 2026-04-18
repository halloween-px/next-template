'use client';

import { cn } from '@/lib/utils';
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
	type MotionValue,
} from 'framer-motion';
import {
	Binary,
	Braces,
	Code2,
	Cpu,
	Database,
	FileCode2,
	GitBranch,
	Package,
	Terminal,
	Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect } from 'react';

type IconItem = {
	Icon: LucideIcon;
	className: string;
	depth: number;
	rotate: number;
};

/** Разброс «программистских» иконок; depth — сила параллакса (0…1) */
const ICON_LAYERS: IconItem[] = [
	{ Icon: Terminal, className: 'left-[4%] top-[14%] h-14 w-14 md:h-16 md:w-16', depth: 0.42, rotate: -10 },
	{ Icon: Code2, className: 'right-[6%] top-[20%] h-12 w-12 md:h-14 md:w-14', depth: 0.32, rotate: 8 },
	{ Icon: Braces, className: 'left-[12%] bottom-[26%] h-11 w-11 md:h-12 md:w-12', depth: 0.38, rotate: 5 },
	{ Icon: Database, className: 'right-[14%] bottom-[18%] h-12 w-12 md:h-14 md:w-14', depth: 0.35, rotate: -6 },
	{ Icon: Cpu, className: 'left-[22%] top-[42%] h-10 w-10 opacity-80 md:h-11 md:w-11', depth: 0.22, rotate: 12 },
	{ Icon: GitBranch, className: 'right-[20%] top-[48%] h-10 w-10 md:h-11 md:w-11', depth: 0.26, rotate: -4 },
	{ Icon: Binary, className: 'left-[8%] top-[58%] h-9 w-9 md:h-10 md:w-10', depth: 0.3, rotate: -3 },
	{ Icon: FileCode2, className: 'right-[10%] bottom-[38%] h-9 w-9 md:h-10 md:w-10', depth: 0.28, rotate: 7 },
	{ Icon: Workflow, className: 'left-[38%] top-[8%] hidden h-9 w-9 md:block', depth: 0.18, rotate: 4 },
	{ Icon: Package, className: 'right-[36%] bottom-[12%] hidden h-9 w-9 lg:block', depth: 0.2, rotate: -5 },
];

const MAX_SHIFT = 36;

function FloatingIcon({
	Icon,
	className,
	depth,
	rotate,
	springX,
	springY,
}: IconItem & {
	springX: MotionValue<number>;
	springY: MotionValue<number>;
}) {
	const x = useTransform(springX, (v) => v * depth);
	const y = useTransform(springY, (v) => v * depth);

	return (
		<motion.div
			style={{ x, y, rotate }}
			className={cn(
				'pointer-events-none absolute text-primary/30 dark:text-primary/25',
				className,
			)}
			aria-hidden>
			<Icon className='size-full' strokeWidth={1.15} />
		</motion.div>
	);
}

type ParallaxDevIconsProps = {
	className?: string;
};

/**
 * Фон из полупрозрачных dev-иконок; слегка следуют за курсором (параллакс).
 * Отдельный клиентский слой — не блокирует клики (`pointer-events-none`).
 */
export function ParallaxDevIconsBackground({ className }: ParallaxDevIconsProps) {
	const reduceMotion = useReducedMotion();
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 52, damping: 22, mass: 0.4 });
	const springY = useSpring(mouseY, { stiffness: 52, damping: 22, mass: 0.4 });

	useEffect(() => {
		if (reduceMotion) {
			mouseX.set(0);
			mouseY.set(0);
			return;
		}

		const onMove = (e: MouseEvent) => {
			const nx = (e.clientX / window.innerWidth - 0.5) * 2;
			const ny = (e.clientY / window.innerHeight - 0.5) * 2;
			mouseX.set(nx * MAX_SHIFT);
			mouseY.set(ny * MAX_SHIFT);
		};

		window.addEventListener('mousemove', onMove, { passive: true });
		return () => window.removeEventListener('mousemove', onMove);
	}, [reduceMotion, mouseX, mouseY]);

	return (
		<div
			className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
			aria-hidden>
			{ICON_LAYERS.map((item, i) => (
				<FloatingIcon key={i} {...item} springX={springX} springY={springY} />
			))}
		</div>
	);
}
