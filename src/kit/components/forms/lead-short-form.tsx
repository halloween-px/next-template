'use client';

import { type FormEvent, useId, useState } from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/kit/components/ui/button';
import { Card, CardContent, CardHeader } from '@/kit/components/ui/card';
import { Input } from '@/kit/components/ui/input';
import { Textarea } from '@/kit/components/ui/textarea';
import { Typography } from '@/kit/components/ui/typography';
import { cn } from '@/lib/utils';
import type { LeadFormCopy, LeadFormShellVariant, LeadShortValues } from '@/lib/forms/lead-types';
import { submitLeadShort } from '@/lib/forms/submit-lead';

export type LeadShortFormProps = {
	copy: LeadFormCopy;
	/** Карточка со стеклом или только поля (удобно внутри Dialog) */
	variant?: LeadFormShellVariant;
	/** Скрыть заголовок/подзаголовок (`plain`) — когда шапка уже в `Dialog` */
	hideHeading?: boolean;
	className?: string;
	/** Контекст для логов / аналитики / бэкенда */
	submitContext: { source: string };
	/** Полный контроль отправки; иначе вызывается `submitLeadShort` */
	onSubmit?: (values: LeadShortValues) => void | Promise<void>;
};

export function LeadShortForm({
	copy,
	variant = 'card',
	hideHeading = false,
	className,
	submitContext,
	onSubmit,
}: LeadShortFormProps) {
	const id = useId();
	const submitLabel = copy.submitLabel ?? 'Отправить';
	const [values, setValues] = useState<LeadShortValues>({ name: '', phone: '', message: '' });
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			if (onSubmit) {
				await onSubmit(values);
			} else {
				await submitLeadShort(values, submitContext);
			}
		} finally {
			setSubmitting(false);
		}
	};

	const formInner = (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div className='space-y-2'>
				<label htmlFor={`${id}-name`} className='text-sm font-medium'>
					Имя
				</label>
				<Input
					id={`${id}-name`}
					name='name'
					autoComplete='name'
					placeholder='Как к вам обращаться'
					value={values.name}
					onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
					required
					disabled={submitting}
					className={variant === 'card' ? 'bg-background/60' : undefined}
				/>
			</div>
			<div className='space-y-2'>
				<label htmlFor={`${id}-phone`} className='text-sm font-medium'>
					Телефон
				</label>
				<Input
					id={`${id}-phone`}
					name='phone'
					type='tel'
					autoComplete='tel'
					placeholder='+7 …'
					value={values.phone}
					onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
					required
					disabled={submitting}
					className={variant === 'card' ? 'bg-background/60' : undefined}
				/>
			</div>
			<div className='space-y-2'>
				<label htmlFor={`${id}-message`} className='text-sm font-medium'>
					Комментарий
				</label>
				<Textarea
					id={`${id}-message`}
					name='message'
					placeholder='Кратко опишите задачу'
					rows={3}
					value={values.message}
					onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
					disabled={submitting}
					className={cn('min-h-18 resize-none', variant === 'card' && 'bg-background/60')}
				/>
			</div>
			<Button type='submit' size='lg' className='w-full gap-2' disabled={submitting}>
				<Send className='h-4 w-4' aria-hidden />
				{submitLabel}
			</Button>
		</form>
	);

	if (variant === 'plain') {
		return (
			<div className={cn('space-y-4', className)}>
				{hideHeading ? null : (
					<div className='space-y-1'>
						<Typography.Title level={4} as='h2'>
							{copy.title}
						</Typography.Title>
						{copy.subtitle ? (
							<Typography.Text size='sm' color='muted'>
								{copy.subtitle}
							</Typography.Text>
						) : null}
					</div>
				)}
				{formInner}
			</div>
		);
	}

	return (
		<Card
			className={cn(
				'border-border/60 bg-background/85 shadow-2xl backdrop-blur-xl',
				className,
			)}>
			<CardHeader className='space-y-1 pb-2'>
				<Typography.Title level={4} as='h2'>
					{copy.title}
				</Typography.Title>
				{copy.subtitle ? (
					<Typography.Text size='sm' color='muted'>
						{copy.subtitle}
					</Typography.Text>
				) : null}
			</CardHeader>
			<CardContent>{formInner}</CardContent>
		</Card>
	);
}
