'use client';

import type { DefaultInfoFormInput } from '@/lib/validations/site-project';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/kit/components/ui/form';
import { Input } from '@/kit/components/ui/input';
import { useFormContext } from 'react-hook-form';

export function ProjectNameField() {
	const { control } = useFormContext<DefaultInfoFormInput>();

	return (
		<FormField
			control={control}
			name='name'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Название проекта</FormLabel>
					<FormControl>
						<Input
							placeholder='Например, Лендинг для салона'
							autoComplete='off'
							autoFocus
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
