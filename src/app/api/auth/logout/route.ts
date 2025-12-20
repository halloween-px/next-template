import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { keyToken } from '@/services/auth';

export async function POST() {
	const cookieStore = await cookies();

	cookieStore.delete(keyToken);

	return NextResponse.json({
		success: true,
		message: 'Выход выполнен успешно',
	});
}
