import type { LeadShortValues, LeadSubmitContext } from './lead-types';

export type SubmitLeadResult = { ok: boolean; error?: string };

/**
 * Единая точка отправки заявок. Подключите реальный endpoint (например `/api/lead`)
 * или прокси в продакшене.
 */
export async function submitLeadShort(
	values: LeadShortValues,
	ctx: LeadSubmitContext,
): Promise<SubmitLeadResult> {
	if (process.env.NODE_ENV === 'development') {
		console.log('[submitLeadShort]', ctx.source, values);
	}

	// TODO: заменить на POST к API, когда маршрут появится в шаблоне / хосте
	return { ok: true };
}
