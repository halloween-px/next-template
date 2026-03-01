import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TUser = {
	id: string;
	email: string;
	name?: string;
	role: 'user' | 'admin';
};

interface AuthState {
	user: TUser | null;
	isLoading: boolean;
	setUser: (user: TUser | null) => void;
	setLoading: (loading: boolean) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: false,
			setUser: (user) => set({ user }),
			setLoading: (isLoading) => set({ isLoading }),
			logout: () => set({ user: null }),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({ user: state.user }),
		}
	)
);
