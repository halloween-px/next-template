import { THeader } from '../type';

/** Идентификатор блока хедера в превью билдера (клик → левая панель). */
export const SECTION_HEADER_ID = 'section-header' as const;

/**
 * Только внешний вид и CTA хедера. Ссылки меню — в `siteConfig.navigation`
 * (см. `mergeHeaderWithSiteNavigation` в рендерере и экспорте).
 */
export const headerConfig: THeader = {
	type: 'header-v1',
	id: SECTION_HEADER_ID,
	content: {
		/** `true` — sticky вверху области сайта; иначе обычный поток. */
		sticky: false,
		navigationVariant: 'menu',
		showPhone: true,
		buttons: [
			{
				href: '/login',
				label: 'Войти',
				variant: 'outline',
			},
			{
				href: '/signup',
				label: 'Начать',
				variant: 'default',
			},
		],
	},
};
