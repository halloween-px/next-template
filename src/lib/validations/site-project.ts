import type { SiteProjectKind } from '@/types/site';
import { z } from 'zod';

export const siteProjectKindSchema = z.enum([
	'landing',
	'multipage',
	'landing_store',
	'multipage_store',
] as const);

export const defaultInfoFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Укажите название проекта')
		.max(120, 'Не длиннее 120 символов'),
	projectType: siteProjectKindSchema,
});

export type DefaultInfoFormInput = z.infer<typeof defaultInfoFormSchema>;

export const defaultDefaultInfoFormValues: DefaultInfoFormInput = {
	name: '',
	projectType: 'landing',
};

export const SITE_PROJECT_KIND_OPTIONS: ReadonlyArray<{
	value: SiteProjectKind;
	label: string;
	description: string;
}> = [
	{
		value: 'landing',
		label: 'Лендинг',
		description: 'Одна страница с ключевыми блоками',
	},
	{
		value: 'multipage',
		label: 'Многостраничный сайт',
		description: 'Несколько страниц и разделов',
	},
	{
		value: 'landing_store',
		label: 'Лендинг + интернет-магазин',
		description: 'Промо-страница и каталог, корзина, оформление заказа',
	},
	{
		value: 'multipage_store',
		label: 'Многостраничный + интернет-магазин',
		description: 'Полноценный сайт: товары, корзина, категории и т.д.',
	},
];

/** Опционально: мастер темы при создании проекта (Style Lab). */
export const themeDraftSchema = z.object({
	mode: z.enum(['light', 'dark', 'system']),
	primary: z.string(),
	accent: z.string(),
	neutral: z.enum(['slate', 'zinc', 'neutral', 'stone', 'gray']),
	radius: z.enum(['sm', 'md', 'lg']),
	fontHeading: z.string(),
	fontBody: z.string(),
	density: z.enum(['comfortable', 'compact']),
});

export const createSiteProjectSchema = z.object({
	name: z.string().trim().min(1, 'Укажите название').max(120),
	projectType: siteProjectKindSchema.optional(),
	config: z.any().optional(),
	themeDraft: themeDraftSchema.optional(),
});

export const updateSiteProjectSchema = z.object({
	name: z.string().trim().min(1).max(120).optional(),
	config: z.any().optional(),
});
