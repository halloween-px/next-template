'use client';

import { API_ROUTES } from '@/config/api-routes';
import { api } from '@/lib/api/client';
import { queryKeys } from '@/lib/api/query-keys';
import type { ThemeDraft } from '@/entities/site-theme/model/theme-draft';
import type { SiteConfig, SiteProjectKind } from '@/types/site';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type CreateSiteProjectResponse = {
	id: string;
	name: string;
	config: SiteConfig;
	createdAt: string;
	updatedAt: string;
};

export type CreateSiteProjectBody = {
	name: string;
	projectType?: SiteProjectKind;
	themeDraft?: ThemeDraft;
	config?: SiteConfig;
};

function mutationErrorToast(err: Error) {
	toast.error('Ошибка', { description: err.message });
}

export function useCreateSiteProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (body: CreateSiteProjectBody) =>
			api.post<CreateSiteProjectResponse>(API_ROUTES.siteProjects.root, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.siteProjects.all });
		},
		onError: mutationErrorToast,
	});
}

export function useDeleteSiteProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => api.delete(API_ROUTES.siteProjects.byId(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.siteProjects.all });
		},
		onError: mutationErrorToast,
	});
}

export type PatchSiteProjectBody = {
	name?: string;
	config?: SiteConfig;
};

export function usePatchSiteProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: PatchSiteProjectBody }) =>
			api.patch<{ success: boolean; data?: { id: string; name: string; config: SiteConfig; updatedAt: string } }>(
				API_ROUTES.siteProjects.byId(id),
				body
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.siteProjects.all });
		},
		onError: mutationErrorToast,
	});
}
