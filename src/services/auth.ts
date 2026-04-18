import { connectDB } from '@/lib/db/connections/mongoose';
import User from '@/lib/db/models/User';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { generateToken, verifyToken } from './token';
import { TUser } from '@/kit/stores/slices/auth-store';

export const keyToken = 'auth-token';

/**
 * Локальная разработка: без cookie сессии подставить пользователя из MongoDB.
 * Задайте в `.env.local` один из вариантов (только при NODE_ENV=development):
 * - AUTH_DEV_USER_ID — ObjectId пользователя
 * - AUTH_DEV_EMAIL — email существующего пользователя
 * В production не используется.
 */
async function resolveDevBypassUser(): Promise<TUser | null> {
	if (process.env.NODE_ENV !== 'development') return null;

	const devId = process.env.AUTH_DEV_USER_ID?.trim();
	const devEmail = process.env.AUTH_DEV_EMAIL?.trim().toLowerCase();
	if (!devId && !devEmail) return null;

	await connectDB();

	const user = devId
		? await User.findById(devId).select('-password').lean()
		: await User.findOne({ email: devEmail }).select('-password').lean();

	if (!user) return null;

	return {
		...user,
		_id: user._id.toString(),
		id: user._id.toString(),
	};
}

export const setCookies = async ({
	userId,
	userRole,
	cookiesOptions,
}: {
	userId: string;
	userRole: string;
	cookiesOptions?: ResponseCookie;
}) => {
	const token = generateToken(userId, userRole);
	const cookieStore = await cookies();
	cookieStore.set('auth-token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7, // 7 дней
		path: '/',
		...cookiesOptions,
	});
};

export const getSession = async (): Promise<TUser | null> => {
	const cookiesStore = cookies();
	const token = (await cookiesStore).get(keyToken)?.value;

	if (token) {
		try {
			const decoded = verifyToken(token);
			if (decoded?.userId) {
				await connectDB();
				const user = await User.findById(decoded.userId).select('-password').lean();
				if (user) {
					return {
						...user,
						_id: user._id.toString(),
						id: user._id.toString(),
					};
				}
			}
		} catch {
			// невалидный токен — в dev можно упасть на AUTH_DEV_*
		}
	}

	return resolveDevBypassUser();
};

export { verifyToken };
