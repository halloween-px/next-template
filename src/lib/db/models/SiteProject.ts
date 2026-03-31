import { Schema, model, models, type Types } from 'mongoose';
import type { SiteConfig } from '@/types/site';

export interface ISiteProject {
	userId: Types.ObjectId;
	name: string;
	config: SiteConfig;
	createdAt: Date;
	updatedAt: Date;
}

const SiteProjectSchema = new Schema<ISiteProject>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		name: { type: String, required: true, trim: true, maxlength: 120 },
		config: { type: Schema.Types.Mixed, required: true },
	},
	{ timestamps: true }
);

SiteProjectSchema.index({ userId: 1, updatedAt: -1 });

export default models.SiteProject || model<ISiteProject>('SiteProject', SiteProjectSchema);
