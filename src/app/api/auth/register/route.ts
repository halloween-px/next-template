import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connections/mongoose';
import User from '@/lib/db/models/User';
import { setCookies } from '@/services/auth';
import { registerSchema } from '@/lib/validations/auth';
import { hashPassword } from '@/services/token';

export async function POST(request: NextRequest) {
	try {
		console.log('hello');
		await connectDB();

		const body = await request.json();
		const validatedData = registerSchema.parse(body);

		// Проверяем, существует ли пользователь
		const existingUser = await User.findOne({ email: validatedData.email });
		if (existingUser) {
			return NextResponse.json(
				{ success: false, error: 'Пользователь с таким email уже существует' },
				{ status: 400 }
			);
		}

		// Хешируем пароль
		const hashedPassword = await hashPassword(validatedData.password);

		// Создаем пользователя
		const user = await User.create({
			email: validatedData.email,
			password: hashedPassword,
			name: validatedData.name,
			role: 'user',
		});

		await setCookies({ userId: user.id, userRole: user.role });

		// Убираем пароль из ответа
		const userResponse = user.toJSON();

		return NextResponse.json(
			{
				success: true,
				data: userResponse,
				message: 'Регистрация успешна',
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error('Ошибка регистрации:', error);

		if (error.name === 'ZodError') {
			return NextResponse.json(
				{ success: false, error: 'Ошибка валидации', details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
