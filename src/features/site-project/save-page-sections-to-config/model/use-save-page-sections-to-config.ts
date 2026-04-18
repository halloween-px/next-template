'use client';

import { mergeBuilderDraftIntoSiteConfig } from '../lib/merge-builder-draft-into-site-config';
import { usePatchSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { useBuilderStore } from '@/stores/slices/site-store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/** Сохранение секций первой страницы из стора билдера в `SiteProject.config` на сервере. */
export function useSavePageSectionsToConfig() {
	const router = useRouter();
	const { projectId, config } = useSiteProjectPreview();
	const sections = useBuilderStore((s) => s.sections);
	const patchProject = usePatchSiteProjectMutation();

	const save = () => {
		if (!sections?.length) return;
		const nextConfig = mergeBuilderDraftIntoSiteConfig(config, sections);
		patchProject.mutate(
			{ id: projectId, body: { config: nextConfig } },
			{
				onSuccess: () => {
					toast.success('Редактирование сохранено');
					router.refresh();
				},
			}
		);
	};

	return {
		save,
		isSaving: patchProject.isPending,
		canSave: Boolean(sections?.length),
	};
}
