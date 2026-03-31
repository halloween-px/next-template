'use client';

import { CreateSiteProjectDialog } from '@/features/create-site-project/ui/create-site-project-dialog';

type Props = {
	createDialogOpen: boolean;
	name: string;
	error: string | null;
	creating: boolean;
	onCreateDialogOpenChange: (open: boolean) => void;
	onNameChange: (value: string) => void;
	onCreate: () => void;
};

export function TemplateHubDialogsHost({
	createDialogOpen,
	name,
	error,
	creating,
	onCreateDialogOpenChange,
	onNameChange,
	onCreate,
}: Props) {
	return (
		<>
			<CreateSiteProjectDialog
				open={createDialogOpen}
				name={name}
				error={error}
				creating={creating}
				onOpenChange={onCreateDialogOpenChange}
				onNameChange={onNameChange}
				onConfirm={onCreate}
			/>
		</>
	);
}
