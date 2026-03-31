type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export function SiteProjectEditorPanel({ isOpen, onClose }: Props) {
	return (
		<aside
			className={
				'fixed left-0 top-0 z-30 h-screen w-[360px] border-r border-white/10 bg-neutral-950/95 backdrop-blur ' +
				'transition-transform duration-[220ms] will-change-transform ' +
				(isOpen ? 'translate-x-0' : '-translate-x-[360px]')
			}>
			<div className='flex items-center justify-between p-4'>
				<div className='font-semibold'>Редактирование</div>
				<button
					type='button'
					onClick={onClose}
					className='rounded-md px-2 py-1 text-sm opacity-80 hover:opacity-100'>
					Закрыть
				</button>
			</div>
			<div className='p-4 text-sm opacity-85'>Тут будут настройки блоков текущей страницы.</div>
		</aside>
	);
}
