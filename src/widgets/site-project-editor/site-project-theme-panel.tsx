'use client';

import { SiteThemeStyleAside } from '@/features/site-theme-style-aside';
import { usePatchSiteProjectMutation } from '@/lib/api/hooks/use-site-project-mutations';
import { Button } from '@/kit/components/ui/button';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { useSiteProjectThemeCustomize } from '@/providers/site-project-theme-customize-provider';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
	isOpen: boolean;
	panelWidthPx: number;
	onClose: () => void;
};

export function SiteProjectThemePanel({ isOpen, panelWidthPx, onClose }: Props) {
	const router = useRouter();
	const { projectId, config } = useSiteProjectPreview();
	const { theme, setTheme, layers, resetTheme } = useSiteProjectThemeCustomize();
	const patchProject = usePatchSiteProjectMutation();

	const handleSave = () => {
		patchProject.mutate(
			{ id: projectId, body: { config: { ...config, theme } } },
			{
				onSuccess: () => {
					toast.success('Тема сохранена');
					router.refresh();
				},
			}
		);
	};

	const w = panelWidthPx;

	return (
		<aside
			className={
				'fixed right-0 top-0 z-30 flex h-screen flex-col border-l border-white/10 bg-neutral-950/95 text-white backdrop-blur ' +
				'transition-transform duration-200 ease-out will-change-transform ' +
				(isOpen ? 'translate-x-0' : 'translate-x-full')
			}
			style={{ width: w }}>
			<button
				type='button'
				onClick={onClose}
				className='absolute left-1 top-1 z-10 inline-flex size-9 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white'
				aria-label='Закрыть оформление'>
				<X className='size-5' strokeWidth={2} aria-hidden />
			</button>

			<div className='shrink-0 border-b border-white/10 px-4 pb-3 pl-12 pt-3'>
				<div className='font-semibold leading-tight'>Оформление сайта</div>
				<p className='mt-1 text-xs text-white/60'>Изменения сразу видны в превью. Сохраните, чтобы записать в проект.</p>
			</div>

			<div className='min-h-0 flex-1 overflow-y-auto p-3'>
				<SiteThemeStyleAside theme={theme} layers={layers} setTheme={setTheme} onReset={resetTheme} />
			</div>

			<div className='shrink-0 border-t border-white/10 p-4'>
				<Button
					type='button'
					className='w-full'
					disabled={patchProject.isPending}
					loading={patchProject.isPending}
					onClick={handleSave}>
					Сохранить тему
				</Button>
			</div>
		</aside>
	);
}
