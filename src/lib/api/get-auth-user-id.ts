import { cookies } from 'next/headers';
import { verifyToken } from '@/services/token';

export async function getAuthUserId(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get('auth-token')?.value;
	if (!token) return null;
	const decoded = verifyToken(token);
	if (!decoded?.userId) return null;
	return String(decoded.userId);
}
