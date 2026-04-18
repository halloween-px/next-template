import { ThemeStyleLabPage } from '@/widgets/site-theme-style-preview';

/**
 * Лаборатория темы: превью компонентов + сохранение черновика для модалки создания проекта.
 */
export default function TestPage() {
	return (
		<div className='box-border flex h-dvh min-h-0 w-full flex-col overflow-hidden overscroll-none p-4 md:p-8'>
			<ThemeStyleLabPage />
		</div>
	);
}
