import { connectDB } from '@/lib/db/connections/mongoose';
import User from '@/lib/db/models/User';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { generateToken, verifyToken } from './token';
import { TUser } from '@/kit/stores/slices/auth-store';

export const keyToken = 'auth-token';

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

	if (!token) return null;

	try {
		const decoded = verifyToken(token);
		if (!decoded && !decoded.userId) return null;

		await connectDB();

		const user = await User.findById(decoded.userId).select('-password').lean();

		if (!user) return null;

		return {
			...user,
			_id: user._id.toString(),
			id: user._id.toString(),
		};
	} catch (error) {
		return null;
	}
};
