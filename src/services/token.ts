import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};

export function generateToken(userId: string, role: string): string {
	return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}
