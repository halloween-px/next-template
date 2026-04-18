import { ROUTES } from '@/config/routes';

/** Только относительные пути того же приложения — защита от open redirect */
export function safeAuthRedirectUrl(candidate: string | null): string {
	if (!candidate) return ROUTES.template;

	let path: string;
	try {
		path = decodeURIComponent(candidate.trim());
	} catch {
		return ROUTES.template;
	}

	if (!path.startsWith('/') || path.startsWith('//')) {
		return ROUTES.template;
	}

	return path;
}
