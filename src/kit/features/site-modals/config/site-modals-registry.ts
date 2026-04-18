import type { LeadFormCopy } from '@/lib/forms/lead-types';

/** Идентификаторы модалок для CTA в блоках kit (кнопки «звонок», «связаться», «обсудить проект»). */
export type SiteModalId = 'orderCall' | 'contact' | 'discussProject';

export type SiteModalDefinition = {
	id: SiteModalId;
	title: string;
	description?: string;
	/** Тексты формы внутри модалки (`hideHeading` в диалоге — заголовок из `title`). */
	formCopy: LeadFormCopy;
	/** `source` для `submitLeadShort` / аналитики */
	submitSource: string;
};

/**
 * Дефолтные тексты и контекст отправки. При необходимости передайте свой реестр в `SiteModalProvider`.
 */
export const DEFAULT_SITE_MODALS: Record<SiteModalId, SiteModalDefinition> = {
	orderCall: {
		id: 'orderCall',
		title: 'Заказать звонок',
		description: 'Оставьте контакты — мы перезвоним и обсудим детали.',
		formCopy: {
			title: '',
			subtitle: undefined,
			submitLabel: 'Жду звонка',
		},
		submitSource: 'modal:orderCall',
	},
	contact: {
		id: 'contact',
		title: 'Связаться',
		description: 'Напишите, как с вами связаться и по какому поводу.',
		formCopy: {
			title: '',
			subtitle: undefined,
			submitLabel: 'Отправить',
		},
		submitSource: 'modal:contact',
	},
	discussProject: {
		id: 'discussProject',
		title: 'Обсудить проект',
		description: 'Расскажите кратко о задаче — подготовим предложение.',
		formCopy: {
			title: '',
			subtitle: undefined,
			submitLabel: 'Отправить заявку',
		},
		submitSource: 'modal:discussProject',
	},
};
