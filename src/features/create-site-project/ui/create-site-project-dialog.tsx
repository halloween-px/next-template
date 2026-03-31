import { Button } from '@/kit/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/kit/components/ui/dialog';
import { Input } from '@/kit/components/ui/input';
import { Label } from '@/kit/components/ui/label';

type Props = {
	open: boolean;
	name: string;
	error: string | null;
	creating: boolean;
	onOpenChange: (open: boolean) => void;
	onNameChange: (value: string) => void;
	onConfirm: () => void;
};

export function CreateSiteProjectDialog({
	open,
	name,
	error,
	creating,
	onOpenChange,
	onNameChange,
	onConfirm,
}: Props) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent showCloseButton>
				<DialogHeader>
					<DialogTitle>Новый сайт</DialogTitle>
				</DialogHeader>
				<div className='grid gap-2 py-2'>
					<Label htmlFor='site-name'>Название</Label>
					<Input
						id='site-name'
						placeholder='Например, Лендинг для салона'
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') onConfirm();
						}}
						autoFocus
					/>
					{error ? <p className='text-sm text-destructive'>{error}</p> : null}
				</div>
				<DialogFooter>
					<Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
						Отмена
					</Button>
					<Button type='button' onClick={onConfirm} loading={creating} disabled={creating}>
						Создать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
