import { z } from 'zod';

export const defaultLoginSchema = {
	email: '',
	password: '',
};

export const defaultRegisterSchema = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const onlyLettersAndSpaces = (value: string) => /^[A-Za-zА-Яа-яЁё\s]+$/.test(value);
const noSpecialChars = (value: string) => /^[A-Za-z0-9@._-]+$/.test(value);

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Имя должно быть минимум 2 символа')
			.max(50, 'Имя не должно превышать 50 символов')
			.refine(onlyLettersAndSpaces, {
				message: 'Имя может содержать только буквы и пробелы',
			})
			.transform((val) => val.trim())
			.refine((val) => val.length >= 2, {
				message: 'Имя должно быть минимум 2 символа после очистки',
			}),

		email: z
			.string()
			.email('Некорректный email')
			.max(100, 'Email не должен превышать 100 символов')
			.toLowerCase()
			.trim(),

		password: z
			.string()
			.min(8, 'Пароль должен быть минимум 8 символов')
			.max(100, 'Пароль не должен превышать 100 символов')
			.refine((val) => /[A-Z]/.test(val), {
				message: 'Пароль должен содержать хотя бы одну заглавную букву',
			})
			.refine((val) => /[a-z]/.test(val), {
				message: 'Пароль должен содержать хотя бы одну строчную букву',
			})
			.refine((val) => /\d/.test(val), {
				message: 'Пароль должен содержать хотя бы одну цифру',
			})
			.refine(noSpecialChars, {
				message: 'Пароль может содержать только буквы, цифры и символы @ . _ -',
			}),

		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	email: z
		.string()
		.email('Некорректный email')
		.max(100, 'Email не должен превышать 100 символов')
		.toLowerCase()
		.trim(),

	password: z.string().min(1, 'Пароль обязателен'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
