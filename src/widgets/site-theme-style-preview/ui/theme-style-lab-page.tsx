'use client';

import { ROUTES } from '@/config/routes';
import {
	readPendingCreateSiteTheme,
	writePendingCreateSiteTheme,
} from '@/entities/site-theme/lib/pending-create-site-theme-storage';
import { siteConfig } from '@/templates/site-template';
import type { ColorScheme, ThemeConfig } from '@/types/site';
import { openCreateSiteProjectModal, useModalStore } from '@/stores/modal-store';
import { Button } from '@/kit/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { SiteThemeStylePreview } from './site-theme-style-preview';

const defaultLabTheme = {
	...siteConfig.theme,
	colorScheme: siteConfig.theme.colorScheme as ColorScheme,
} as ThemeConfig;

/**
 * Полноэкранная лаборатория темы: превью + действия «назад» / «сохранить черновик».
 */
export function ThemeStyleLabPage() {
	const router = useRouter();
	const initialTheme = useMemo(() => readPendingCreateSiteTheme() ?? defaultLabTheme, []);
	const [liveTheme, setLiveTheme] = useState<ThemeConfig>(initialTheme);

	/** После перехода с `/template`: закрываем до первого paint, чтобы не мелькал список сайтов под модалкой. */
	useLayoutEffect(() => {
		useModalStore.getState().closeModal('createSiteProject');
	}, []);

	const handleThemeChange = useCallback((next: ThemeConfig) => {
		setLiveTheme(next);
		writePendingCreateSiteTheme(next);
	}, []);

	const backToCreate = () => {
		writePendingCreateSiteTheme(liveTheme);
		router.push(ROUTES.template);
		openCreateSiteProjectModal();
	};

	const saveCustomization = () => {
		writePendingCreateSiteTheme(liveTheme);
		toast.success('Тема сохранена', {
			description: 'Черновик уже учтён при создании проекта.',
		});
	};

	return (
		<div className='flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-hidden'>
			<header className='flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm'>
				<p className='max-w-xl text-sm text-muted-foreground'>
					Подберите тему по компонентам — черновик обновляется при каждом изменении. Отдельное сохранение по
					кнопке ниже помечает версию явно (toast).
				</p>
				<div className='flex flex-wrap items-center gap-2'>
					<Button type='button' variant='outline' size='sm' onClick={backToCreate}>
						<ArrowLeft className='mr-2 size-4' aria-hidden />
						Вернуться к созданию проекта
					</Button>
					<Button type='button' size='sm' onClick={saveCustomization}>
						<Check className='mr-2 size-4' aria-hidden />
						Сохранить кастомизацию
					</Button>
				</div>
			</header>

			<div className='flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden'>
				<SiteThemeStylePreview theme={initialTheme} onThemeChange={handleThemeChange} />
			</div>
		</div>
	);
}
