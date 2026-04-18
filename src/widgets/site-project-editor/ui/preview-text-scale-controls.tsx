'use client';

import { Button } from '@/kit/components/ui/button';
import { usePatchSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { cn } from '@/lib/utils';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { useSiteProjectThemeCustomize } from '@/providers/site-project-theme-customize-provider';
import { useRouter } from 'next/navigation';

const OPTIONS = [
	{ value: 0.875, label: 'Меньше' },
	{ value: 1, label: 'Стандарт' },
	{ value: 1.125, label: 'Крупнее' },
] as const;

/** Глобальный масштаб текста превью (`config.theme.textScale`), сохраняется в проект. */
export function PreviewTextScaleControls() {
	const router = useRouter();
	const { config, projectId } = useSiteProjectPreview();
	const { theme, setTheme } = useSiteProjectThemeCustomize();
	const patch = usePatchSiteProjectMutation();

	const current = theme.textScale ?? 1;
	const busy = patch.isPending;

	const apply = (value: number) => {
		const nextTheme = { ...theme, textScale: value };
		setTheme(nextTheme);
		patch.mutate(
			{ id: projectId, body: { config: { ...config, theme: nextTheme } } },
			{ onSuccess: () => router.refresh() }
		);
	};

	return (
		<div className='shrink-0 border-t border-white/8 px-4 py-3'>
			<p className='mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40'>
				Размер текста в превью
			</p>
			<p className='mb-2.5 text-xs leading-snug text-white/45'>
				Влияет на отображение сайта в центре и сохраняется в теме проекта.
			</p>
			<div className='flex flex-wrap gap-1.5'>
				{OPTIONS.map((opt) => {
					const selected = Math.abs(current - opt.value) < 0.0001;
					return (
						<Button
							key={opt.value}
							type='button'
							variant='secondary'
							size='sm'
							disabled={busy}
							className={cn(
								'min-w-[calc(50%-0.1875rem)] flex-1 border border-white/10 bg-white/10 text-xs text-white hover:bg-white/14 sm:min-w-0 sm:flex-1',
								selected && 'border-white/25 bg-white/18 ring-1 ring-white/20'
							)}
							onClick={() => apply(opt.value)}
							aria-pressed={selected}>
							{opt.label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
