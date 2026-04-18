import { SiteThemeStylePreview } from '@/widgets/site-theme-style-preview';

/**
 * Высота по viewport + flex, чтобы дочерний превью мог отдать flex-1 min-h-0
 * и скролл оставался внутри секции, а не на document.
 */
export default function TestPage() {
	return (
		<div className='box-border flex h-dvh min-h-0 w-full flex-col overflow-hidden overscroll-none p-4 md:p-8'>
			<SiteThemeStylePreview />
		</div>
	);
}
