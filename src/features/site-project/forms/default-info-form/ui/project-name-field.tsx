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
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

type Props = {
	/** Визуальный акцент в модалке создания (крупнее подпись и поле). */
	emphasized?: boolean;
	/** Заголовок карточки уже объясняет шаг — ниже видимая подпись к полю ввода. */
	embedInActionCard?: boolean;
};

export function ProjectNameField({ emphasized, embedInActionCard }: Props) {
	const { control } = useFormContext<DefaultInfoFormInput>();

	return (
		<FormField
			control={control}
			name='name'
			render={({ field }) => (
				<FormItem className={cn((emphasized || embedInActionCard) && 'gap-3')}>
					<div className='space-y-2'>
						{embedInActionCard ? (
							<>
								<FormLabel className='flex flex-wrap items-baseline gap-x-2 text-base font-semibold text-foreground'>
									<span>Название</span>
									<span className='text-sm font-normal text-destructive' aria-hidden>
										обязательно
									</span>
								</FormLabel>
								<p className='text-sm leading-snug text-muted-foreground'>
									Напишите название в поле ниже — так вы отличите этот сайт от других в аккаунте.
								</p>
							</>
						) : (
							<>
								<FormLabel
									className={cn(
										emphasized
											? 'text-lg font-semibold tracking-tight text-foreground md:text-xl'
											: 'text-sm font-medium',
									)}>
									Название проекта
								</FormLabel>
								{emphasized ? (
									<p className='text-sm text-muted-foreground'>
										Как будет называться сайт в списке и в интерфейсе — можно сменить позже.
									</p>
								) : null}
							</>
						)}
					</div>
					<FormControl>
						<Input
							className={cn(
								'h-11 rounded-lg bg-background text-base md:h-12 md:text-lg',
								embedInActionCard
									? cn(
											'rounded-xl border-2 border-input shadow-sm placeholder:text-muted-foreground/80 transition-[border-color,box-shadow,ring-width] duration-300',
											/* В тон крупной кнопке «Создать проект»: primary + объём как у CTA */
											'focus-visible:border-primary/50 focus-visible:outline-none',
											'focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
											'focus-visible:shadow-[0_14px_48px_-12px_hsl(var(--primary)/0.42),inset_0_1px_0_0_rgb(255_255_255/0.1)]',
										)
									: cn(
											'rounded-lg border border-border transition-colors focus-visible:border-primary/50',
											emphasized &&
												'border-2 border-input shadow-sm placeholder:text-muted-foreground/80',
										),
							)}
							placeholder='Введите название, например: студия «Омега»'
							autoComplete='off'
							autoFocus
							aria-required='true'
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
