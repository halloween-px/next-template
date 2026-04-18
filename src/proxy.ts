import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './services/token';
import { API_ROUTES } from './config/api-routes';

const authConfig = {
	protectedRoutes: ['/dashboard', '/admin', '/profile', '/checkout', '/orders'],
	guestRoutes: ['/login', '/register', '/forgot-password', '/reset-password'],
	adminRoutes: ['/admin', '/admin/dashboard', '/admin/users', '/admin/settings'],
	publicRoutes: ['/', '/about', '/features', '/services', '/products', '/contact', '/api/public'],

	publicApiRoutes: [API_ROUTES.auth.register, API_ROUTES.auth.login, API_ROUTES.auth.logout],
};

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get('auth-token')?.value;

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico') ||
		pathname.startsWith('/images/')
	) {
		return NextResponse.next();
	}

	const isProtectedRoute = authConfig.protectedRoutes.some((route) => pathname.startsWith(route));
	const isGuestRoute = authConfig.guestRoutes.some((route) => pathname.startsWith(route));
	const isAdminRoute = authConfig.adminRoutes.some((route) => pathname.startsWith(route));

	const isPublicApiRoute = authConfig.publicApiRoutes.some((route) => pathname.startsWith(route));

	let userRole: string | null = null;
	if (token) {
		const decoded = verifyToken(token);

		if (typeof decoded === 'object' && decoded !== null && 'role' in decoded) {
			userRole = (decoded as any).role;
		}
	}

	if (isGuestRoute && token && userRole) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (isProtectedRoute) {
		if (!token || !userRole) {
			const redirectUrl = new URL('/login', request.url);
			redirectUrl.searchParams.set('callbackUrl', encodeURI(pathname));
			return NextResponse.redirect(redirectUrl);
		}

		if (isAdminRoute && userRole !== 'admin') {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
	}

	if (pathname.startsWith('/api/') && !isPublicApiRoute) {
		if (!token || !userRole) {
			return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
		}

		if (pathname.startsWith('/api/admin/') && userRole !== 'admin') {
			return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
