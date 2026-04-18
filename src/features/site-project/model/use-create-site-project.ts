'use client';

import {
	clearPendingCreateSiteTheme,
	readPendingCreateSiteTheme,
} from '@/entities/site-theme/lib/pending-create-site-theme-storage';
import { DEFAULT_THEME_DRAFT } from '@/entities/site-theme/model/theme-draft';
import { useCreateSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { siteConfig as defaultSiteConfigTemplate } from '@/templates/site-template';
import type { DefaultInfoFormInput } from '@/lib/validations/site-project';
import type { SiteConfig } from '@/types/site';
import { useCallback, useState } from 'react';

export type CreateSiteProjectResult = { id: string; name: string };

function cloneDefaultSiteConfig(): SiteConfig {
	return JSON.parse(JSON.stringify(defaultSiteConfigTemplate)) as SiteConfig;
}

function siteConfigForCreate(themeFromLab: SiteConfig['theme'], projectType: DefaultInfoFormInput['projectType']) {
	const config = cloneDefaultSiteConfig();
	config.theme = themeFromLab;
	config.projectType = projectType;
	return config;
}

/** Мутация создания проекта; тема из лаборатории (/test) читается из sessionStorage. */
export function useCreateSiteProject() {
	const createMutation = useCreateSiteProjectMutation();

	const [validationError, setValidationError] = useState<string | null>(null);

	const reset = useCallback(() => {
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
				const pendingTheme = readPendingCreateSiteTheme();

				const res = pendingTheme
					? await createMutation.mutateAsync({
							name: trimmed,
							projectType: data.projectType,
							config: siteConfigForCreate(pendingTheme, data.projectType),
						})
					: await createMutation.mutateAsync({
							name: trimmed,
							projectType: data.projectType,
							themeDraft: DEFAULT_THEME_DRAFT,
						});

				clearPendingCreateSiteTheme();
				reset();
				return { id: res.id, name: trimmed };
			} catch {
				return null;
			}
		},
		[createMutation, reset]
	);

	const errorMessage =
		validationError ??
		(createMutation.error instanceof Error ? createMutation.error.message : null);

	return {
		creating: createMutation.isPending,
		error: errorMessage,
		setError: setValidationError,
		reset,
		submit,
	};
}
