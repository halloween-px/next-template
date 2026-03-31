import { connectDB } from '@/lib/db/connections/mongoose';
import SiteProject from '@/lib/db/models/SiteProject';
import type { SiteConfig } from '@/types/site';
import mongoose from 'mongoose';

export type SiteProjectListItem = {
	id: string;
	name: string;
	updatedAt: string;
	createdAt: string;
};

/** Список проектов пользователя (для RSC и API). */
export async function listSiteProjectsForUser(userId: string): Promise<SiteProjectListItem[]> {
	await connectDB();
	const projects = await SiteProject.find({ userId })
		.sort({ updatedAt: -1 })
		.select('_id name updatedAt createdAt')
		.lean();

	return projects.map((p) => ({
		id: p._id.toString(),
		name: p.name,
		updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : String(p.updatedAt),
		createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : String(p.createdAt),
	}));
}

export async function getSiteProjectForUser(projectId: string, userId: string) {
	if (!mongoose.isValidObjectId(projectId)) return null;
	await connectDB();
	const doc = await SiteProject.findOne({ _id: projectId, userId }).lean();
	if (!doc) return null;
	return {
		id: doc._id.toString(),
		name: doc.name,
		config: doc.config as SiteConfig,
	};
}
