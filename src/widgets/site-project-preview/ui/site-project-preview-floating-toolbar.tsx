'use client';

import { useProjectPreviewRoute } from '@/features/site-project-navigation/model/use-project-preview-route';
import { useSiteProjectPreview } from '@/providers/site-project-preview-provider';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2, PencilLine } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function SiteProjectPreviewFloatingToolbar() {
	const router = useRouter();
	const { projectId } = useSiteProjectPreview();
	const { isEditing } = useProjectPreviewRoute(projectId);
	const [editorPending, startEditorTransition] = useTransition();

	const openEditor = () => {
		startEditorTransition(() => {
			const params = new URLSearchParams({ editor: '1' });
			router.push(`?${params.toString()}`);
		});
	};

	return (
		<div
			className={cn(
				'flex items-stretch overflow-hidden rounded-2xl',
				'border border-white/18 shadow-[0_12px_48px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.12)]',
				'bg-neutral-950/78 backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:bg-neutral-950/55'
			)}>
			<Link
				href='/template'
				className={cn(
					'flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium leading-none tracking-[-0.01em]',
					'text-white/92 transition-[background,color] duration-150',
					'hover:bg-white/7 active:bg-white/11',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'
				)}>
				<ArrowLeft className='size-3.5 shrink-0 opacity-85' strokeWidth={2.25} aria-hidden />
				Мои сайты
			</Link>

			<div className='my-2 w-px shrink-0 bg-white/14' aria-hidden />

			<button
				type='button'
				disabled={editorPending}
				onClick={openEditor}
				aria-busy={editorPending}
				aria-pressed={isEditing}
				className={cn(
					'flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium leading-none tracking-[-0.01em]',
					'transition-[background,color] duration-150',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
					'disabled:pointer-events-none disabled:opacity-60',
					isEditing ? 'bg-white/14 text-white' : 'text-white/92 hover:bg-white/7 active:bg-white/11'
				)}>
				{editorPending ? (
					<Loader2 className='size-3.5 shrink-0 animate-spin opacity-90' aria-hidden />
				) : (
					<PencilLine className='size-3.5 shrink-0 opacity-88' strokeWidth={2.25} aria-hidden />
				)}
				{editorPending ? 'Открываю…' : isEditing ? 'Редактор' : 'Редактировать'}
			</button>
		</div>
	);
}
