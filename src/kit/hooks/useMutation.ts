import { useState } from 'react';
import { toast } from 'sonner';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface MutationOptions<T> {
	onSuccess?: (data: T) => void;
	onError?: (error: any) => void;
	successMessage?: string;
	errorMessage?: string;
	throwOnError?: boolean;
}

export function useMutation<T = any>(url: string, method: Method = 'POST') {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T | null>(null);

	const mutate = async (
		body?: any,
		options?: MutationOptions<T>
	): Promise<{ success: boolean; data?: T; error?: string }> => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: body ? JSON.stringify(body) : undefined,
			});
			console.log(response);
			const result = await response.json();

			if (!response.ok || !result.success) {
				console.log(result);
				throw new Error(result.error || 'Ошибка запроса');
			}

			setData(result.data);

			if (options?.onSuccess) {
				options.onSuccess(result.data);
			}

			if (options?.successMessage) {
				toast('Успешно', {
					description: options.successMessage,
				});
			}

			return { success: true, data: result.data };
		} catch (err: any) {
			const errorMessage = err.message || 'Ошибка сервера';
			setError(errorMessage);

			if (options?.onError) {
				options.onError(err);
			}

			toast.warning('Ошибка', {
				description: options?.errorMessage || errorMessage,
			});

			if (options?.throwOnError) {
				throw err;
			}

			return { success: false, error: errorMessage };
		} finally {
			setIsLoading(false);
		}
	};

	return {
		mutate,
		isLoading,
		error,
		data,
	};
}
