import { z } from 'zod';

export const createSiteProjectSchema = z.object({
	name: z.string().trim().min(1, 'Укажите название').max(120),
	config: z.any().optional(),
});

export const updateSiteProjectSchema = z.object({
	name: z.string().trim().min(1).max(120).optional(),
	config: z.any().optional(),
});
