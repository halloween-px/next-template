'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils/utils';
import { useMutation } from '@/hooks/useMutation';
import { defaultLoginSchema, LoginInput, loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAplle } from '../../../../public/icons/IconApple';
import { IconGoogle } from '../../../../public/icons/IconGoogle';
import { IconGitHub } from '../../../../public/icons/IconGitHub';
import { API_ROUTES } from '@/config/api-routes';
import { useUserContext } from '@/components/providers/user-provider';
import { TUser } from '@/stores/slices/auth-store';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
	const { setUser } = useUserContext();
	const { mutate, isLoading } = useMutation<TUser>(API_ROUTES.auth.login);
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: defaultLoginSchema,
		mode: 'onChange',
	});
	const { control, handleSubmit } = form;

	const onSubmit = async (data: LoginInput) => {
		const user = (await mutate(data)).data || null;
		setUser(user);
		redirect('/');
	};

	return (
		<Form {...form}>
			<form
				className={cn('flex flex-col gap-6', className)}
				onSubmit={handleSubmit(onSubmit)}
				{...props}>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h1 className='text-2xl font-bold'>Вход в учетную запись</h1>
					<p className='text-muted-foreground text-sm text-balance'>
						Введите свой адрес электронной почты ниже
					</p>
				</div>
				<div className='grid gap-6'>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem className='grid gap-3'>
								<Label htmlFor='email'>Почта</Label>
								<FormControl {...field}>
									<Input
										id='email'
										name='email'
										type='email'
										placeholder='m@example.com'
										required
									/>
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
								<FormControl {...field}>
									<Input
										id='password'
										name='password'
										type='password'
										placeholder='********'
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
				</div>
				<div className='text-center text-sm'>
					Еще нет аккаунта?{' '}
					<a href='#' className='underline underline-offset-4'>
						Зарегистрироваться
					</a>
				</div>
			</form>
		</Form>
	);
}
