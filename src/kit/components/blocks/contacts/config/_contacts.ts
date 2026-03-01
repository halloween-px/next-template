export const CONTACTS_ID = 'section-contacts';
export const CONTACTS_TYPE = 'contacts-v1';

export const contactsConfig = {
	id: CONTACTS_ID,
	type: CONTACTS_TYPE,
	content: {
		title: 'Свяжитесь с нами',
		subtitle: 'Готовы начать ваш проект?',
		description: 'Заполните форму ниже, и мы свяжемся с вами в ближайшее время',
		contactInfo: [
			{ icon: 'Mail', label: 'Email', value: 'info@techcompany.com' },
			{ icon: 'Phone', label: 'Телефон', value: '+7 (999) 123-45-67' },
			{ icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Примерная, д. 1' },
		],
		formFields: [
			{
				name: 'name',
				label: 'Имя',
				type: 'text',
				placeholder: 'Ваше имя',
				required: true,
			},
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'Ваш email',
				required: true,
			},
			{
				name: 'message',
				label: 'Сообщение',
				type: 'textarea',
				placeholder: 'Ваше сообщение',
				required: true,
			},
		],
	},
};
