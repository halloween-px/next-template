'use client';

import { TUser } from '@/stores/slices/auth-store';
import React, { useContext, useState } from 'react';

export const UserLayoutContext = React.createContext<{
	user: TUser | null;
	setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
	logout: () => void;
} | null>(null);

export const UserProvider = ({
	children,
	initialUser,
}: {
	children: React.ReactNode;
	initialUser: TUser | null;
}) => {
	const [user, setUser] = useState<TUser | null>(initialUser);
	const logout = () => setUser(null);

	return (
		<UserLayoutContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserLayoutContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserLayoutContext);

	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}

	return context;
};
