'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { Button } from '@/kit/components/ui/button';
import { type ReactNode, useTransition } from 'react';
import { cn } from '@/lib/utils';

type OpenBuilderPageProps = {
	children?: ReactNode;
	btnText?: string;
	onNavigateStart?: () => void;
	projectId?: string;
	slug?: string;
	className?: string;
	mode?: 'route' | 'inline';
};

export const OpenBuilderPage = ({
	children,
	btnText,
	onNavigateStart,
	projectId,
	slug,
	className,
	mode = 'route',
}: OpenBuilderPageProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		onNavigateStart?.();
		startTransition(() => {
			if (mode === 'inline') {
				const params = new URLSearchParams({ editor: '1' });
				router.push(`?${params.toString()}`);
				return;
			}

			if (!projectId) {
				router.push(ROUTES.builder);
				return;
			}
			const params = new URLSearchParams({ projectId, slug: slug || '/' });
			router.push(`${ROUTES.builder}?${params.toString()}`);
		});
	};

	return (
		<div className={cn('', className)}>
			<Button
				type='button'
				variant='secondary'
				disabled={isPending}
				onClick={handleClick}
				aria-busy={isPending}
				loading={isPending}>
				{isPending ? 'Открываю' : children ?? btnText ?? 'Редактировать'}
			</Button>
		</div>
	);
};
