'use client';

import { Button } from '@/kit/components/ui/button';
import { Input } from '@/kit/components/ui/input';
import { Label } from '@/kit/components/ui/label';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useMutation } from '@/kit/hooks/useMutation';
import { useForm } from 'react-hook-form';
import { defaultRegisterSchema, registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/kit/components/ui/form';
import { TUser } from '@/kit/stores/slices/auth-store';
import { API_ROUTES } from '@/config/api-routes';
import { useUserContext } from '@/kit/components/providers/user-provider';
import { IconAplle } from '../../../../public/icons/IconApple';
import { IconGoogle } from '../../../../public/icons/IconGoogle';
import { IconGitHub } from '../../../../public/icons/IconGitHub';

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
	const { mutate, isLoading } = useMutation<TUser>(API_ROUTES.auth.register);
	const { setUser } = useUserContext();
	const form = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: defaultRegisterSchema,
		mode: 'onChange',
	});
	const { handleSubmit, control } = form;

	const onSubmit = async (data: RegisterInput) => {
		const user = await mutate(data);

		if (user.data && user.success) {
			setUser(user.data);
			redirect('/');
		}
	};

	return (
		<Form {...form}>
			<form
				className={cn('flex flex-col gap-6', className)}
				onSubmit={handleSubmit(onSubmit)}
				{...props}>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h1 className='text-2xl font-bold'>Регистрация</h1>
					<p className='text-muted-foreground text-sm text-balance'>
						Введите свои данные для регистрации
					</p>
				</div>
				<div className='grid gap-6'>
					<FormField
						control={control}
						name='name'
						render={({ field, formState }) => (
							<FormItem className='grid gap-3'>
								<Label htmlFor='name'>Имя {formState.isValid}</Label>
								<FormControl>
									<Input id='name' type='name' placeholder='Ваше имя' required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem className='grid gap-3'>
								<Label htmlFor='email'>Почта</Label>
								<FormControl>
									<Input id='email' type='email' placeholder='m@example.com' required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='password'
						render={({ field }) => (
							<FormItem className='grid gap-3'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Пароль</Label>
									<a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
										Забыли пароль?
									</a>
								</div>
								<FormControl>
									<Input
										id='password'
										type='password'
										placeholder='Придумайте пароль'
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem className='grid gap-3'>
								<FormControl>
									<Input
										id='password_confirmation'
										type='password'
										placeholder='Повторите пароль'
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type='submit' className='w-full' loading={isLoading} disabled={isLoading}>
					Войти
				</Button>
				<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
					<span className='bg-background text-muted-foreground relative z-10 px-2'>
						или продолжить как
					</span>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<Button variant='outline' type='button' className='w-full'>
						<IconAplle />
						<span className='sr-only'>Login with Apple</span>
					</Button>
					<Button variant='outline' type='button' className='w-full'>
						<IconGoogle />
						<span className='sr-only'>Login with Google</span>
					</Button>
					<Button variant='outline' type='button' className='w-full'>
						<IconGitHub />
						<span className='sr-only'>Login with GitHub</span>
					</Button>
				</div>
			</form>
		</Form>
	);
}
