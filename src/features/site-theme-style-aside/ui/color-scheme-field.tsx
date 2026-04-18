'use client';

import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';
import type { ColorScheme } from '@/types/site';

export type ColorSchemeFieldProps = {
	value: ColorScheme;
	onChange: (next: ColorScheme) => void;
};

export function ColorSchemeField({ value, onChange }: ColorSchemeFieldProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='spc-scheme'>Светлая или тёмная</Label>
			<Select value={value} onValueChange={(v) => onChange(v as ColorScheme)}>
				<SelectTrigger id='spc-scheme' className='h-10 w-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='light'>Светлая</SelectItem>
					<SelectItem value='dark'>Тёмная</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
