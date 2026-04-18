/**
 * Единый fetch к `/api/*`: cookies, JSON-конверт `{ success, data?, error? }`, типизированные ошибки.
 */

export class ApiError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly body?: unknown
	) {
		super(message);
		this.name = 'ApiError';
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

type ApiRequestOptions = {
	json?: unknown;
	signal?: AbortSignal;
};

async function apiRequest<T>(method: string, url: string, options?: ApiRequestOptions): Promise<T> {
	const hasJsonBody = options?.json !== undefined && options?.json !== null;

	const res = await fetch(url, {
		method,
		credentials: 'include',
		signal: options?.signal,
		headers: hasJsonBody ? { 'Content-Type': 'application/json' } : undefined,
		body: hasJsonBody ? JSON.stringify(options.json) : undefined,
	});

	const text = await res.text();
	let parsed: unknown = null;
	if (text) {
		try {
			parsed = JSON.parse(text);
		} catch {
			throw new ApiError('Некорректный JSON ответа', res.status);
		}
	}

	const obj = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;

	if (!res.ok) {
		const msg =
			obj && typeof obj.error === 'string' ? obj.error : 'Ошибка запроса';
		throw new ApiError(msg, res.status, obj);
	}

	if (obj && obj.success === false) {
		const msg = typeof obj.error === 'string' ? obj.error : 'Ошибка запроса';
		throw new ApiError(msg, res.status, obj);
	}

	if (obj && obj.success === true && 'data' in obj) {
		return obj.data as T;
	}

	if (obj && obj.success === true) {
		return undefined as T;
	}

	throw new ApiError('Некорректный ответ сервера', res.status, obj);
}

export const api = {
	get: <T>(url: string, signal?: AbortSignal) =>
		apiRequest<T>('GET', url, { signal }),

	post: <T>(url: string, json?: unknown, signal?: AbortSignal) =>
		apiRequest<T>('POST', url, { json, signal }),

	patch: <T>(url: string, json?: unknown, signal?: AbortSignal) =>
		apiRequest<T>('PATCH', url, { json, signal }),

	delete: (url: string, signal?: AbortSignal) =>
		apiRequest<void>('DELETE', url, { signal }),
};
