import mongoose from 'mongoose';

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
	global.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
	const MONGODB_URI = process.env.MONGODB_URI;
	if (!MONGODB_URI) {
		throw new Error(
			'Задайте MONGODB_URI в переменных окружения (локально — .env.local, на Vercel — Settings → Environment Variables).',
		);
	}

	if (cached.conn) {
		console.log('✅ Используем существующее подключение MongoDB');
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			dbName: 'template',
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts);
		console.log('🔄 Новое подключение MongoDB...');
	}

	try {
		cached.conn = await cached.promise;
		console.log('✅ MongoDB подключена');
	} catch (e) {
		cached.promise = null;
		console.error('❌ Ошибка подключения MongoDB:', e);
		throw e;
	}

	return cached.conn;
}
