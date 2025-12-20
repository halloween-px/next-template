import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connections/mongoose';
import User from '@/lib/db/models/User';
import { setCookies } from '@/services/auth';
import { loginSchema } from '@/lib/validations/auth';
import { verifyPassword } from '@/services/token';

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();
		const validatedData = loginSchema.parse(body);

		const user = await User.findOne({ email: validatedData.email });
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Неверный email или пароль' },
				{ status: 401 }
			);
		}

		const isValidPassword = await verifyPassword(validatedData.password, user.password);

		if (!isValidPassword) {
			return NextResponse.json(
				{ success: false, error: 'Неверный email или пароль' },
				{ status: 401 }
			);
		}

		await setCookies({ userId: user.id, userRole: user.role });

		const userResponse = user.toJSON();

		return NextResponse.json({
			success: true,
			data: userResponse,
			message: 'Вход выполнен успешно',
		});
	} catch (error: any) {
		console.error('Ошибка входа:', error);

		if (error.name === 'ZodError') {
			return NextResponse.json(
				{ success: false, error: 'Ошибка валидации', details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
