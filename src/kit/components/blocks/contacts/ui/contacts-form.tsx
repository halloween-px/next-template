'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import { Button } from '@/kit/components/ui/button';
import { Input } from '@/kit/components/ui/input';
import { Textarea } from '@/kit/components/ui/textarea';
import { Send } from 'lucide-react';
import type { TContactsFormField } from '../types';

type Layout = 'split' | 'stacked';

type Props = {
	fields: TContactsFormField[];
	layout?: Layout;
	idPrefix?: string;
	submitClassName?: string;
};

export function ContactsForm({
	fields,
	layout = 'split',
	idPrefix = 'contact',
	submitClassName,
}: Props) {
	const initial = useMemo(
		() => Object.fromEntries(fields.map((f) => [f.name, ''])) as Record<string, string>,
		[fields],
	);
	const [data, setData] = useState(initial);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('[contacts] submit', data);
	};

	const textLike = fields.filter((f) => f.type !== 'textarea');
	const textareas = fields.filter((f) => f.type === 'textarea');

	const renderField = (field: TContactsFormField) => {
		const id = `${idPrefix}-${field.name}`;
		const commonLabel = (
			<label htmlFor={id} className='block text-sm font-semibold'>
				{field.label}
				{field.required ? <span className='text-destructive'> *</span> : null}
			</label>
		);

		if (field.type === 'textarea') {
			return (
				<div key={field.name} className='space-y-2'>
					{commonLabel}
					<Textarea
						id={id}
						placeholder={field.placeholder}
						className='min-h-28 resize-none border-2 bg-background focus-visible:border-primary'
						value={data[field.name] ?? ''}
						onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
						required={field.required}
					/>
				</div>
			);
		}

		return (
			<div key={field.name} className='space-y-2'>
				{commonLabel}
				<Input
					id={id}
					type={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
					placeholder={field.placeholder}
					className='h-12 border-2 bg-background focus-visible:border-primary'
					value={data[field.name] ?? ''}
					onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
					required={field.required}
				/>
			</div>
		);
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			{textLike.length > 0 ? (
				<div
					className={
						layout === 'split'
							? 'grid gap-6 md:grid-cols-2'
							: 'flex flex-col gap-5'
					}>
					{textLike.map(renderField)}
				</div>
			) : null}

			{textareas.map(renderField)}

			<Button
				type='submit'
				size='lg'
				className={
					submitClassName ??
					'h-12 w-full text-base font-semibold shadow-lg transition-all duration-300 md:h-14'
				}>
				<Send className='mr-2 size-5' aria-hidden />
				Отправить сообщение
			</Button>
		</form>
	);
}
