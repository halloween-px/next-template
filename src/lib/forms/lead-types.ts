/** Значения компактной заявки (имя / телефон / комментарий) */
export type LeadShortValues = {
	name: string;
	phone: string;
	message: string;
};

/** Оболочка: карточка (hero, лендинг) или без рамки (модалка со своим Dialog) */
export type LeadFormShellVariant = 'card' | 'plain';

/** Тексты шапки формы — задаются в конфиге блока / сайта */
export type LeadFormCopy = {
	title: string;
	subtitle?: string;
	submitLabel?: string;
};

/** Контекст отправки: откуда вызвана форма */
export type LeadSubmitContext = {
	source: string;
};
