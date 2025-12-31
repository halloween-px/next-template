export const contactsTemplate = {
	id: 'section-contact',
	type: 'contact',
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
				placeholder: 'your@email.com',
				required: true,
			},
			{
				name: 'phone',
				label: 'Телефон',
				type: 'tel',
				placeholder: '+7 (___) ___-__-__',
				required: false,
			},
			{
				name: 'message',
				label: 'Сообщение',
				type: 'textarea',
				placeholder: 'Расскажите о проекте...',
				required: true,
			},
		],
	},
};
