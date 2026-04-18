/** Публичные данные компании в конфиге сайта (футер, шапка, блоки с контактами). */
export type SiteCompanyInfo = {
	name: string;
	description: string;
	logo: { text: string; image: string; link?: string };
	contacts: {
		phone: string;
		email: string;
		address: string;
	};
	social: Record<string, string>;
};
