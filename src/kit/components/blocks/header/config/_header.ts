import { THeader } from '../type';

/**
 * Только внешний вид и CTA хедера. Ссылки меню — в `siteConfig.navigation`
 * (см. `mergeHeaderWithSiteNavigation` в рендерере и экспорте).
 */
export const headerConfig: THeader = {
	type: 'header-v1',
	id: 'section-header',
	content: {
		sticky: true,
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
