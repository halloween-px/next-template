import { withCapturedSemanticColors } from '@/entities/site-theme/lib/capture-theme-semantic-colors';
import type { ThemeConfig } from '@/types/site';

const STORAGE_KEY = 'next-template:pending-create-site-theme';

function isThemeConfig(value: unknown): value is ThemeConfig {
	if (!value || typeof value !== 'object') return false;
	const t = value as ThemeConfig;
	if (t.colorScheme !== 'light' && t.colorScheme !== 'dark') return false;
	if (typeof t.primaryColor !== 'string' || typeof t.accentColor !== 'string') return false;
	const fonts = t.fonts;
	if (!fonts || typeof fonts !== 'object') return false;
	if (typeof fonts.heading !== 'string' || typeof fonts.body !== 'string') return false;
	return true;
}

export function readPendingCreateSiteTheme(): ThemeConfig | null {
	if (typeof window === 'undefined') return null;
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as unknown;
		if (!isThemeConfig(parsed)) return null;
		return withCapturedSemanticColors(parsed);
	} catch {
		return null;
	}
}

export function writePendingCreateSiteTheme(theme: ThemeConfig): void {
	if (typeof window === 'undefined') return;
	const normalized = withCapturedSemanticColors(theme);
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function clearPendingCreateSiteTheme(): void {
	if (typeof window === 'undefined') return;
	sessionStorage.removeItem(STORAGE_KEY);
}
