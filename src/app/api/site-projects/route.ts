import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connections/mongoose';
import SiteProject from '@/lib/db/models/SiteProject';
import { getAuthUserId } from '@/lib/api/get-auth-user-id';
import { listSiteProjectsForUser } from '@/lib/db/site-project-queries';
import { createSiteProjectSchema } from '@/lib/validations/site-project';
import { siteConfig as defaultSiteConfig } from '@/templates/site-template';
import type { SiteConfig } from '@/types/site';

function cloneDefaultConfig(): SiteConfig {
	return JSON.parse(JSON.stringify(defaultSiteConfig)) as SiteConfig;
}

export async function GET() {
	try {
		const userId = await getAuthUserId();
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const data = await listSiteProjectsForUser(userId);

		return NextResponse.json({ success: true, data });
	} catch (e) {
		console.error('site-projects GET', e);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const userId = await getAuthUserId();
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const body = await request.json();
		const parsed = createSiteProjectSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{ success: false, error: 'Ошибка валидации', details: parsed.error.flatten() },
				{ status: 400 }
			);
		}

		const { name, config: bodyConfig } = parsed.data;
		const config: SiteConfig = bodyConfig ? (bodyConfig as SiteConfig) : cloneDefaultConfig();

		await connectDB();

		const doc = await SiteProject.create({
			userId,
			name,
			config,
		});

		return NextResponse.json({
			success: true,
			data: {
				id: doc._id.toString(),
				name: doc.name,
				config: doc.config,
				createdAt: doc.createdAt,
				updatedAt: doc.updatedAt,
			},
		});
	} catch (e) {
		console.error('site-projects POST', e);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
