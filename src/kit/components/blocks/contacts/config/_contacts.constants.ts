import type { TContactsContent } from '../types';
import { getContactsBlockInfo } from '@/templates/company';

export const CONTACTS_ID = 'section-contacts';

export const CONTACTS_TYPES = {
	V1: 'contacts-v1',
	V2: 'contacts-v2',
	V3: 'contacts-v3',
} as const;

/** @deprecated используйте CONTACTS_TYPES.V1 */
export const CONTACTS_TYPE = CONTACTS_TYPES.V1;

export function defaultContactsPreset(): TContactsContent {
	return {
		title: 'Свяжитесь с нами',
		subtitle: 'Готовы начать ваш проект?',
		description: 'Заполните форму ниже, и мы свяжемся с вами в ближайшее время',
		splitImage: 'about/modern-office-collaboration.png',
		contactInfo: getContactsBlockInfo(),
		formFields: [
			{
				name: 'name',
				label: 'Ваше имя',
				type: 'text',
				placeholder: 'Иван Иванов',
				required: true,
			},
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'ivan@example.com',
				required: true,
			},
			{
				name: 'phone',
				label: 'Телефон',
				type: 'tel',
				placeholder: '+7 (999) 123-45-67',
				required: false,
			},
			{
				name: 'subject',
				label: 'Тема обращения',
				type: 'text',
				placeholder: 'Разработка веб-приложения',
				required: true,
			},
			{
				name: 'message',
				label: 'Сообщение',
				type: 'textarea',
				placeholder: 'Расскажите о задаче и сроках…',
				required: true,
			},
		],
	};
}
