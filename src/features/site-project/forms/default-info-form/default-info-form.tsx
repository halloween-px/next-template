'use client';

import { ProjectNameField } from './ui/project-name-field';
import { ProjectTypeField } from './ui/project-type-field';
import { ROUTES } from '@/config/routes';
import { useCreateSiteProject } from '@/features/site-project/model/use-create-site-project';
import {
	defaultDefaultInfoFormValues,
	defaultInfoFormSchema,
	type DefaultInfoFormInput,
} from '@/lib/validations/site-project';
import { useModalStore } from '@/stores/modal-store';
import { Button } from '@/kit/components/ui/button';
import { Form } from '@/kit/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {
	defaultValues?: Partial<DefaultInfoFormInput>;
};

export function DefaultInfoForm({ defaultValues }: Props) {
	const router = useRouter();
	const { submit, creating } = useCreateSiteProject();

	const form = useForm<DefaultInfoFormInput>({
		resolver: zodResolver(defaultInfoFormSchema),
		defaultValues: { ...defaultDefaultInfoFormValues, ...defaultValues },
		mode: 'onChange',
	});

	const { handleSubmit } = form;

	const onValidSubmit = async (data: DefaultInfoFormInput) => {
		const result = await submit(data);
		if (!result) return;
		useModalStore.getState().closeModal('createSiteProject');
		router.push(ROUTES.templateProject(result.id));
	};

	return (
		<Form {...form}>
			<form className='flex flex-col gap-6' onSubmit={handleSubmit(onValidSubmit)}>
				<ProjectNameField />
				<ProjectTypeField />

				<Button
					type='submit'
					className='w-full sm:w-auto sm:self-end'
					loading={creating}
					disabled={creating}>
					{creating ? 'Создаём…' : 'Создать проект'}
				</Button>
			</form>
		</Form>
	);
}
