import type { SectionTextAlign } from '@/types/section-layout';

export type TContactsFormField = {
	name: string;
	label: string;
	type: 'text' | 'email' | 'tel' | 'textarea';
	placeholder: string;
	required: boolean;
};

export type TContactsContent = {
	title: string;
	subtitle: string;
	description: string;
	contactInfo: Array<{
		icon: string;
		label: string;
		value: string;
		href?: string;
	}>;
	formFields: TContactsFormField[];
	/** Путь от `/images/` для коллажа contacts-v3 (половина экрана — фото). */
	splitImage?: string;
	sectionTitleAlign?: SectionTextAlign;
	sectionBodyAlign?: SectionTextAlign;
};

export type TContacts = {
	id: string;
	type: string;
	content: TContactsContent;
};
