import { Plus } from 'lucide-react';

type Props = {
	onClick: () => void;
};

export function CreateSiteProjectTrigger({ onClick }: Props) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='group flex min-h-[180px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-center transition-colors hover:border-primary/50 hover:bg-muted/50'>
			<div className='flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-transform group-hover:scale-105'>
				<Plus className='h-7 w-7 text-muted-foreground group-hover:text-primary' />
			</div>
			<span className='mt-3 text-sm font-medium text-foreground'>Новый сайт</span>
			<span className='mt-1 max-w-[200px] text-xs text-muted-foreground'>
				Задайте имя — конфиг сохранится в вашем аккаунте
			</span>
		</button>
	);
}
