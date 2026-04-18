'use client';

import { useDeleteSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { Button } from '@/kit/components/ui/button';
import { TrashIcon } from 'lucide-react';

type Props = {
	projectId: string;
};

export function DeleteSiteProjectButton({ projectId }: Props) {
	const deleteMutation = useDeleteSiteProjectMutation();

	return (
		<Button
			type='button'
			variant='outline'
			disabled={deleteMutation.isPending}
			loading={deleteMutation.isPending}
			aria-label='Удалить проект'
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				deleteMutation.mutate(projectId);
			}}>
			<TrashIcon className='h-4 w-4' />
		</Button>
	);
}
