'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { Button } from '@/kit/components/ui/button';
import { type ReactNode, useTransition } from 'react';

type OpenBuilderPageProps = {
	children?: ReactNode;
	btnText?: string;
	onNavigateStart?: () => void;
};

export const OpenBuilderPage = ({ children, btnText, onNavigateStart }: OpenBuilderPageProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		onNavigateStart?.();
		startTransition(() => {
			router.push(ROUTES.builder);
		});
	};

	return (
		<div className='fixed left-4 bottom-4 flex justify-center'>
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
