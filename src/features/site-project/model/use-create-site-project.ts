'use client';

import { useCreateSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { DEFAULT_THEME_DRAFT, type ThemeDraft } from '@/entities/site-theme/model/theme-draft';
import type { DefaultInfoFormInput } from '@/lib/validations/site-project';
import { useCallback, useState } from 'react';

export type CreateSiteProjectResult = { id: string; name: string };

/** Мутация создания проекта + themeDraft под следующий шаг мастера. Подключается в `DefaultInfoForm`. */
export function useCreateSiteProject() {
	const createMutation = useCreateSiteProjectMutation();

	const [themeDraft, setThemeDraft] = useState<ThemeDraft>(DEFAULT_THEME_DRAFT);
	const [validationError, setValidationError] = useState<string | null>(null);

	const reset = useCallback(() => {
		setThemeDraft(DEFAULT_THEME_DRAFT);
		setValidationError(null);
		createMutation.reset();
	}, [createMutation]);

	const submit = useCallback(
		async (data: DefaultInfoFormInput): Promise<CreateSiteProjectResult | null> => {
			const trimmed = data.name.trim();
			if (!trimmed) {
				setValidationError('Введите название');
				return null;
			}

			setValidationError(null);
			try {
				const res = await createMutation.mutateAsync({
					name: trimmed,
					projectType: data.projectType,
					themeDraft,
				});
				reset();
				return { id: res.id, name: trimmed };
			} catch {
				return null;
			}
		},
		[createMutation, themeDraft, reset]
	);

	const errorMessage =
		validationError ??
		(createMutation.error instanceof Error ? createMutation.error.message : null);

	return {
		themeDraft,
		setThemeDraft,
		creating: createMutation.isPending,
		error: errorMessage,
		setError: setValidationError,
		reset,
		submit,
	};
}
