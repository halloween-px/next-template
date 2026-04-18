'use client';

import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { Typography } from '@/kit/components/ui/typography';
import { usePatchSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import type { SiteUiKit } from '@/types/site-ui-kit';
import { mergeSiteUiKit } from '@/types/site-ui-kit';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { SectionTitleUiKitPresets } from './ui/ui-kit-editor/section-title-ui-kit-presets';

export function SiteProjectUiToolkitCanvas() {
	const { config, projectId } = useSiteProjectPreview();
	const router = useRouter();
	const patch = usePatchSiteProjectMutation();

	const ui = mergeSiteUiKit(config.uiKit);
	const busy = patch.isPending;

	const persistUiKit = async (next: Partial<SiteUiKit>) => {
		const merged = mergeSiteUiKit({ ...ui, ...next });
		try {
			await patch.mutateAsync({
				id: projectId,
				body: {
					config: {
						...config,
						uiKit: merged,
					},
				},
			});
			toast.success('Пресет заголовков сохранён в проект');
			router.refresh();
		} catch {
			// toast от мутации
		}
	};

	return (
		<Section>
			<Container>
				<SectionTitleUiKitPresets
					selected={ui.sectionTitle}
					busy={busy}
					onSelect={(variant) => persistUiKit({ sectionTitle: variant })}
				/>
			</Container>
		</Section>
	);
}
