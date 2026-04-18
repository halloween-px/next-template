'use client';

import { SITE_PROJECT_KIND_OPTIONS, type DefaultInfoFormInput } from '@/lib/validations/site-project';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/kit/components/ui/form';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export function ProjectTypeField() {
	const { control } = useFormContext<DefaultInfoFormInput>();

	return (
		<FormField
			control={control}
			name='projectType'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Тип сайта</FormLabel>
					<FormControl>
						<div className='grid gap-3 sm:grid-cols-2' role='radiogroup' aria-label='Тип сайта'>
							{SITE_PROJECT_KIND_OPTIONS.map((option) => {
								const selected = field.value === option.value;
								return (
									<label
										key={option.value}
										className={cn(
											'cursor-pointer rounded-xl border bg-card p-4 text-left shadow-sm transition-colors',
											'has-focus-visible:ring-2 has-focus-visible:ring-ring',
											selected
												? 'border-primary bg-primary/5 ring-2 ring-primary'
												: 'border-border hover:border-primary/40 hover:bg-muted/30'
										)}>
										<input
											type='radio'
											className='sr-only'
											name={field.name}
											value={option.value}
											checked={selected}
											onChange={() => field.onChange(option.value)}
											onBlur={field.onBlur}
										/>
										<span className='block text-sm font-medium leading-snug'>{option.label}</span>
										<span className='mt-1 block text-xs text-muted-foreground leading-relaxed'>
											{option.description}
										</span>
									</label>
								);
							})}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
