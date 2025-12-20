// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/services/auth';
import { connectDB } from '@/lib/db/connections/mongoose';
import User from '@/lib/db/models/User';

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const cookieStore = await cookies();
		const token = cookieStore.get('auth-token')?.value;

		if (!token) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const decoded = verifyToken(token);
		if (!decoded) {
			return NextResponse.json({ success: false, error: 'Невалидный токен' }, { status: 401 });
		}

		const user = await User.findById(decoded.userId).select('-password');
		if (!user) {
			return NextResponse.json(
				{ success: false, error: 'Пользователь не найден' },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: user,
		});
	} catch (error) {
		console.error('Ошибка получения пользователя:', error);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
