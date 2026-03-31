import type { FooterContact, FooterSocial } from '@/kit/components/blocks/footer/type';

/**
 * Данные компании — один файл для правок.
 * Используется в site-template, футере, блоке контактов.
 *
 * После `npm run build-project` этот файл копируется в `src/templates/company.ts`
 * скачанного проекта — правьте здесь же; контент страницы также в `src/data/content.json` (site.companyInfo).
 */
export const company = {
	name: 'TechCompany',
	/** Заголовок в верхней части футера */
	tagline: 'Инновационные решения для вашего бизнеса',
	/** Описание компании (футер, siteConfig, блоки) */
	description: 'Создаём инновационные цифровые решения для вашего бизнеса',
	logo: {
		text: 'TechCompany',
		image: '/logo.svg',
		link: '',
	},
	/** Телефон, почта, адрес — одни и те же значения везде */
	contacts: {
		phone: {
			label: 'Телефон',
			value: '+7 999 123-45-67',
			href: 'tel:+79991234567',
		},
		email: {
			label: 'Email',
			value: 'info@techcompany.ru',
			href: 'mailto:info@techcompany.ru',
		},
		address: {
			label: 'Адрес',
			value: 'Москва, ул. Примерная, 1',
			href: '#contact',
		},
	},
	/** platform → URL (иконка в футере по ключу platform) */
	social: {
		github: '#',
		twitter: '#',
		linkedin: '#',
		facebook: '#',
	} as const,
} as const;

/** Для `siteConfig.companyInfo` (плоские поля + social как объект) */
export function getSiteCompanyInfo() {
	return {
		name: company.name,
		description: company.description,
		logo: { ...company.logo },
		contacts: {
			phone: company.contacts.phone.value,
			email: company.contacts.email.value,
			address: company.contacts.address.value,
		},
		social: { ...company.social },
	};
}

/** Строки футера с иконками (TFooterContent.contacts) */
export function getFooterContacts(): FooterContact[] {
	const { phone, email, address } = company.contacts;
	return [
		{ iconKey: 'phone', label: phone.label, value: phone.value, href: phone.href },
		{ iconKey: 'mail', label: email.label, value: email.value, href: email.href },
		{ iconKey: 'map', label: address.label, value: address.value, href: address.href },
	];
}

/** Массив для TFooterContent.social */
export function getFooterSocial(): FooterSocial[] {
	return (Object.entries(company.social) as [string, string][]).map(([platform, url]) => ({
		platform,
		url,
	}));
}

/** Блок «Свяжитесь с нами» — contactInfo с иконками Lucide */
export function getContactsBlockInfo() {
	const { phone, email, address } = company.contacts;
	return [
		{ icon: 'Mail', label: email.label, value: email.value },
		{ icon: 'Phone', label: phone.label, value: phone.value },
		{ icon: 'MapPin', label: address.label, value: address.value },
	];
}
