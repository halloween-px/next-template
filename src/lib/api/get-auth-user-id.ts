import { getSession } from '@/services/auth';

export async function getAuthUserId(): Promise<string | null> {
	const session = await getSession();
	return session?.id ?? null;
}
