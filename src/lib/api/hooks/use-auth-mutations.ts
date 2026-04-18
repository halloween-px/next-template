'use client';

import type { TUser } from '@/kit/stores/slices/auth-store';
import { API_ROUTES } from '@/config/api-routes';
import { api } from '@/lib/api/client';
import type { LoginInput, RegisterInput } from '@/lib/validations/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

function mutationErrorToast(err: Error) {
	toast.error('Ошибка', { description: err.message });
}

export function useLoginMutation() {
	return useMutation({
		mutationFn: (input: LoginInput) => api.post<TUser>(API_ROUTES.auth.login, input),
		onError: mutationErrorToast,
	});
}

export function useRegisterMutation() {
	return useMutation({
		mutationFn: (input: RegisterInput) => api.post<TUser>(API_ROUTES.auth.register, input),
		onError: mutationErrorToast,
	});
}

export function useLogoutMutation() {
	return useMutation({
		mutationFn: () => api.post<void>(API_ROUTES.auth.logout),
		onError: mutationErrorToast,
	});
}
