import type { LeadFormCopy, LeadFormShellVariant } from '@/lib/forms/lead-types';
import type { SiteModalId } from '@/kit/features/site-modals';

type Slide = {
	title: string;
	description: string;
	backgroundImage: string;
	contentPosition: {
		x: AlignmentX;
		y: AlignmentY;
	};
	buttons: Array<{
		label: string;
		link: string;
		/** Открыть модалку kit вместо перехода по ссылке */
		modal?: SiteModalId;
	}>;
	/** hero-v2: строка над заголовком */
	eyebrow?: string;
	/** hero-v2: чипы под кнопками (стек, услуги и т.д.) */
	tags?: string[];
	/** hero-v2: короткая цитата / доверие под тегами */
	quote?: string;
	/** hero-v2: смысловой блок после текста — превью + пояснение (не в начале карточки) */
	leftAccent?: {
		/** Короткий заголовок блока (о чём превью и зачем оно здесь) */
		label?: string;
		caption?: string;
		images: Array<{ src: string; alt: string }>;
	};
	/** hero-v2: правая стеклянная карточка (подсказки / контакты / факты) */
	asideCard?: {
		title: string;
		/** Короткий текст под заголовком */
		intro?: string;
		rows: Array<{
			label: string;
			value: string;
			/** Имя иконки Lucide (как в DynamicIcon), напр. `Calendar` */
			icon?: string;
		}>;
	};
};

/** hero-v4: конфиг заявки (тот же пресет можно переиспользовать в модалке с `shell: plain`) */
export type THeroLeadFormConfig = LeadFormCopy & {
	preset?: 'lead-short';
	shell?: LeadFormShellVariant;
};

export type THeroContent = {
	autoplay?: boolean;
	interval?: number;
	slides: Slide[];
	/** hero-v4: форма заявки в правом нижнем углу поверх hero */
	leadForm?: THeroLeadFormConfig;
};

export type THero = {
	id: string;
	type: string;
	content: THeroContent;
};

export type AlignmentX = 'left' | 'center' | 'right';
export type AlignmentY = 'top' | 'center' | 'bottom';
