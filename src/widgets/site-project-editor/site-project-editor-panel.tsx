'use client';

import { useSavePageSectionsToConfig } from '@/features/site-project/save-page-sections-to-config';
import { Button } from '@/kit/components/ui/button';
import { useBuilderStore } from '@/stores/slices/site-store';
import { MousePointerClick, Save, X } from 'lucide-react';
import { EditorContent } from './ui/editor-content/editor-content';
import { PreviewTextScaleControls } from './ui/preview-text-scale-controls';
import { ToolbarPanel } from './ui/toolbar-panel';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export function SiteProjectEditorPanel({ isOpen, onClose }: Props) {
	const activeSection = useBuilderStore((s) => s.activeSection);
	const { save, isSaving, canSave } = useSavePageSectionsToConfig();

	return (
		<aside
			className={
				'fixed left-0 top-0 z-30 flex h-screen w-[360px] flex-col border-r border-white/8 bg-neutral-950/95 text-white shadow-[4px_0_24px_rgba(0,0,0,0.35)] backdrop-blur-xl ' +
				'transition-transform duration-200 ease-out will-change-transform ' +
				(isOpen ? 'translate-x-0' : '-translate-x-[360px]')
			}>
			<header className='shrink-0 border-b border-white/8 px-4 py-4'>
				<div className='flex items-start justify-between gap-3'>
					<div className='min-w-0'>
						<p className='text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40'>Редактор</p>
						<h2 className='mt-0.5 text-lg font-semibold tracking-tight text-white'>Страница</h2>
						<p className='mt-1 text-xs leading-relaxed text-white/50'>
							Блоки на превью — затем «Сохранить редактирование» внизу. Тему оформления — отдельно.
						</p>
					</div>
					<button
						type='button'
						onClick={onClose}
						className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white'
						aria-label='Закрыть панель'>
						<X className='size-5' strokeWidth={2} aria-hidden />
					</button>
				</div>
			</header>

			<ToolbarPanel />

			<div className='min-h-0 flex-1 overflow-y-auto px-4 py-4'>
				{activeSection ? (
					<EditorContent />
				) : (
					<div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-white/12 bg-white/2 px-4 py-10 text-center'>
						<div
							className='mb-3 flex size-11 items-center justify-center rounded-full bg-white/5 text-white/45 ring-1 ring-white/10'
							aria-hidden>
							<MousePointerClick className='size-5' />
						</div>
						<p className='text-sm font-medium text-white/85'>Выберите блок</p>
						<p className='mt-2 max-w-[240px] text-xs leading-relaxed text-white/45'>
							Кликните по секции на превью слева — здесь появятся варианты оформления.
						</p>
					</div>
				)}
			</div>

			<PreviewTextScaleControls />

			<footer className='shrink-0 border-t border-white/8 bg-neutral-950/80 p-4'>
				<Button
					type='button'
					className='w-full gap-2'
					disabled={!isOpen || !canSave || isSaving}
					loading={isSaving}
					onClick={save}>
					<Save className='size-4' aria-hidden />
					Сохранить редактирование
				</Button>
			</footer>
		</aside>
	);
}
