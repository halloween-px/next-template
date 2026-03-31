'use client';

import { API_ROUTES } from '@/config/api-routes';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CreateResult = {
	id: string;
	name: string;
};

export function useCreateSiteProject() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [creating, setCreating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createProject = async (): Promise<CreateResult | null> => {
		const trimmed = name.trim();
		if (!trimmed) {
			setError('Введите название');
			return null;
		}

		setCreating(true);
		setError(null);
		try {
			const res = await fetch(API_ROUTES.siteProjects.root, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: trimmed }),
			});
			const json = await res.json();
			if (!res.ok) {
				setError(json.error ?? 'Не удалось создать проект');
				return null;
			}

			const id = json.data?.id as string | undefined;
			if (!id) {
				setError('Некорректный ответ сервера');
				return null;
			}

			setName('');
			router.push(ROUTES.templateProject(id));
			return { id, name: trimmed };
		} catch {
			setError('Ошибка сети');
			return null;
		} finally {
			setCreating(false);
		}
	};

	return {
		name,
		setName,
		creating,
		error,
		setError,
		createProject,
	};
}
