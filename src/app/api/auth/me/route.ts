import { NextResponse } from 'next/server';
import { getSession } from '@/services/auth';

export async function GET() {
	try {
		const user = await getSession();

		if (!user) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
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
