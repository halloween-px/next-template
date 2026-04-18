'use client';

import { Button } from '@/kit/components/ui/button';
import { cn } from '@/lib/utils';
import { usePreviewEditorPanel } from '@/widgets/site-project-preview/model/use-preview-editor-panel';
import { ArrowLeft, LayoutGrid, Palette } from 'lucide-react';

/** Горизонтальная полоса действий редактора: тема и базовый UI kit. */
export function ToolbarPanel() {
	const { openThemePanel, toggleUiToolkitCanvas, uiToolkitCanvas, closeUiToolkitCanvas } =
		usePreviewEditorPanel();

	return (
		<div className='shrink-0 border-b border-white/8 px-4 py-3'>
			<p className='mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40'>Панель</p>
			<div className='-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-0.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent'>
				{uiToolkitCanvas ? (
					<Button
						type='button'
						variant='secondary'
						size='sm'
						className='shrink-0 gap-1.5 border border-emerald-400/35 bg-emerald-500/15 text-white hover:bg-emerald-500/22'
						onClick={closeUiToolkitCanvas}>
						<ArrowLeft className='size-4 opacity-90' aria-hidden />
						К превью сайта
					</Button>
				) : null}
				<Button
					type='button'
					variant='secondary'
					size='sm'
					className='shrink-0 gap-1.5 border border-white/10 bg-white/10 text-white hover:bg-white/14'
					onClick={openThemePanel}>
					<Palette className='size-4 opacity-90' aria-hidden />
					Оформление сайта
				</Button>
				<Button
					type='button'
					variant='secondary'
					size='sm'
					className={cn(
						'shrink-0 gap-1.5 border border-white/10 text-white hover:bg-white/14',
						uiToolkitCanvas ? 'bg-white/18' : 'bg-white/10',
					)}
					onClick={toggleUiToolkitCanvas}
					aria-pressed={uiToolkitCanvas}>
					<LayoutGrid className='size-4 opacity-90' aria-hidden />
					Мелкий UI
				</Button>
			</div>
		</div>
	);
}
