import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db/connections/mongoose';
import SiteProject from '@/lib/db/models/SiteProject';
import { getAuthUserId } from '@/lib/api/get-auth-user-id';
import { updateSiteProjectSchema } from '@/lib/validations/site-project';
import type { SiteConfig } from '@/types/site';

type RouteContext = { params: Promise<{ id: string }> };

async function loadOwnedProject(userId: string, id: string) {
	if (!mongoose.isValidObjectId(id)) return null;
	await connectDB();
	return SiteProject.findOne({ _id: id, userId }).lean();
}

/** Один проект (полный `config`) — только владелец. */
export async function GET(_request: NextRequest, context: RouteContext) {
	try {
		const userId = await getAuthUserId();
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const { id } = await context.params;
		const project = await loadOwnedProject(userId, id);
		if (!project) {
			return NextResponse.json({ success: false, error: 'Не найдено' }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			data: {
				id: project._id.toString(),
				name: project.name,
				config: project.config as SiteConfig,
				createdAt: project.createdAt,
				updatedAt: project.updatedAt,
			},
		});
	} catch (e) {
		console.error('site-projects/[id] GET', e);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}

export async function PATCH(request: NextRequest, context: RouteContext) {
	try {
		const userId = await getAuthUserId();
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const { id } = await context.params;
		if (!mongoose.isValidObjectId(id)) {
			return NextResponse.json({ success: false, error: 'Некорректный id' }, { status: 400 });
		}

		const body = await request.json();
		const parsed = updateSiteProjectSchema.safeParse(body);
		if (!parsed.success) {
			return NextResponse.json(
				{ success: false, error: 'Ошибка валидации', details: parsed.error.flatten() },
				{ status: 400 },
			);
		}

		await connectDB();

		const update: { name?: string; config?: SiteConfig } = {};
		if (parsed.data.name !== undefined) update.name = parsed.data.name;
		if (parsed.data.config !== undefined) update.config = parsed.data.config as SiteConfig;

		if (Object.keys(update).length === 0) {
			return NextResponse.json({ success: false, error: 'Нет полей для обновления' }, { status: 400 });
		}

		const doc = await SiteProject.findOneAndUpdate({ _id: id, userId }, update, {
			new: true,
		}).lean();

		if (!doc) {
			return NextResponse.json({ success: false, error: 'Не найдено' }, { status: 404 });
		}

		return NextResponse.json({
			success: true,
			data: {
				id: doc._id.toString(),
				name: doc.name,
				config: doc.config as SiteConfig,
				updatedAt: doc.updatedAt,
			},
		});
	} catch (e) {
		console.error('site-projects/[id] PATCH', e);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
	try {
		const userId = await getAuthUserId();
		if (!userId) {
			return NextResponse.json({ success: false, error: 'Не авторизован' }, { status: 401 });
		}

		const { id } = await context.params;
		if (!mongoose.isValidObjectId(id)) {
			return NextResponse.json({ success: false, error: 'Некорректный id' }, { status: 400 });
		}

		await connectDB();

		const res = await SiteProject.deleteOne({ _id: id, userId });
		if (res.deletedCount === 0) {
			return NextResponse.json({ success: false, error: 'Не найдено' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error('site-projects/[id] DELETE', e);
		return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
	}
}
