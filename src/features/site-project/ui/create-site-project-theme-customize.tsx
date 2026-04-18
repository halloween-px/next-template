'use client';

import { CreateProjectActionCard } from '@/features/site-project/ui/create-project-action-card';
import {
	readPendingCreateSiteTheme,
} from '@/entities/site-theme/lib/pending-create-site-theme-storage';
import { getDefaultCreateSiteThemeForUi } from '@/entities/site-theme/lib/default-create-site-theme';
import { PendingThemeSummary } from '@/entities/site-theme/ui/pending-theme-summary';
import { ROUTES } from '@/config/routes';
import { useModalStore } from '@/stores/modal-store';
import { Button } from '@/kit/components/ui/button';
import { Palette, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ThemeConfig } from '@/types/site';

/**
 * Лаборатория темы (/test): черновик в sessionStorage; без черновика показываем дефолт шаблона.
 */
export function CreateSiteProjectThemeCustomize() {
	const router = useRouter();
	const isCreateModalOpen = useModalStore((s) => s.modals.some((m) => m.id === 'createSiteProject'));
	const [storedTheme, setStoredTheme] = useState<ThemeConfig | null>(null);

	useEffect(() => {
		if (!isCreateModalOpen) return;
		setStoredTheme(readPendingCreateSiteTheme());
	}, [isCreateModalOpen]);

	useEffect(() => {
		if (!isCreateModalOpen) return;
		const sync = () => setStoredTheme(readPendingCreateSiteTheme());
		window.addEventListener('focus', sync);
		return () => window.removeEventListener('focus', sync);
	}, [isCreateModalOpen]);

	const goToThemeLab = () => {
		router.push(ROUTES.themeLab);
	};

	const hasStoredDraft = Boolean(storedTheme);
	const displayTheme = storedTheme ?? getDefaultCreateSiteThemeForUi();

	return (
		<CreateProjectActionCard
			kicker='По желанию'
			icon={hasStoredDraft ? <Sparkles className='size-5' aria-hidden /> : <Palette className='size-5' aria-hidden />}
			title='Тема до превью'
			description='Лаборатория со всеми блоками kit и панелью слоёв. Черновик обновляется при каждой правке и подставится при создании проекта.'
			variant='dashed'>
			<div className='space-y-4'>
				<div>
					<p className='mb-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground'>
						{hasStoredDraft ? 'Текущий черновик' : 'Тема по умолчанию'}
					</p>
					<PendingThemeSummary theme={displayTheme} />
					{!hasStoredDraft ? (
						<p className='mt-3 text-xs leading-relaxed text-muted-foreground'>
							Берётся из шаблона нового проекта. Откройте лабораторию, чтобы изменить палитру и слои.
						</p>
					) : null}
				</div>

				<Button
					type='button'
					variant='secondary'
					className='h-10 w-full gap-2 border border-border/80 shadow-sm'
					onClick={goToThemeLab}>
					<Palette className='size-4 opacity-90' aria-hidden />
					{hasStoredDraft ? 'Изменить в лаборатории' : 'Открыть лабораторию темы'}
				</Button>
			</div>
		</CreateProjectActionCard>
	);
}
