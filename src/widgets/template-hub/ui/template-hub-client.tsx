'use client';

import { useCreateSiteProject } from '@/features/create-site-project/model/use-create-site-project';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { useState } from 'react';
import { TemplateHubDialogsHost } from './template-hub-dialogs-host';
import { TemplateHub } from './template-hub';

type Props = {
	/** Уже загружено на сервере (getSession + БД). */
	initialProjects: SiteProjectListItem[];
	isLoggedIn: boolean;
};

export function TemplateHubClient({ initialProjects, isLoggedIn }: Props) {
	const [projects, setProjects] = useState(initialProjects);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const { name, setName, creating, error, setError, createProject } = useCreateSiteProject();

	const handleCreate = async () => {
		const result = await createProject();
		if (!result) return;

		setCreateDialogOpen(false);
		const now = new Date().toISOString();
		setProjects((prev) => [{ id: result.id, name: result.name, createdAt: now, updatedAt: now }, ...prev]);
	};

	return (
		<>
			<TemplateHub
				isLoggedIn={isLoggedIn}
				projects={projects}
				onCreateClick={() => {
					setError(null);
					setName('');
					setCreateDialogOpen(true);
				}}
			/>
			<TemplateHubDialogsHost
				createDialogOpen={createDialogOpen}
				name={name}
				error={error}
				creating={creating}
				onCreateDialogOpenChange={setCreateDialogOpen}
				onNameChange={setName}
				onCreate={() => void handleCreate()}
			/>
		</>
	);
}
