'use client';

import { ProjectNameField } from './ui/project-name-field';
import { ProjectTypeLandingField } from './ui/project-type-landing-field';
import { ROUTES } from '@/config/routes';
import { useCreateSiteProject } from '@/features/site-project/model/use-create-site-project';
import { CreateProjectActionCard } from '@/features/site-project/ui/create-project-action-card';
import { CreateSiteProjectIntro } from '@/features/site-project/ui/create-site-project-intro';
import { CreateSiteProjectSubmitButton } from '@/features/site-project/ui/create-site-project-submit-button';
import { CreateSiteProjectThemeCustomize } from '@/features/site-project/ui/create-site-project-theme-customize';
import {
	defaultDefaultInfoFormValues,
	defaultInfoFormSchema,
	type DefaultInfoFormInput,
} from '@/lib/validations/site-project';
import { useModalStore } from '@/stores/modal-store';
import { Form } from '@/kit/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderPlus } from 'lucide-react';
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
			<form className='flex flex-col' onSubmit={handleSubmit(onValidSubmit)}>
				<div className='grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12'>
					<div className='flex min-h-0 flex-col gap-8 lg:justify-between'>
						<div className='space-y-3'>
							<p className='text-[11px] font-semibold uppercase tracking-wider text-muted-foreground'>
								Ваши действия
							</p>
							<CreateProjectActionCard
								kicker='Обязательно'
								icon={<FolderPlus className='size-5' aria-hidden />}
								title='Введите название проекта'
								description='Без названия проект не создать — напишите, как сайт будет называться в списке «Мои сайты» и в редакторе. Потом можно изменить.'
								variant='dashed'>
								<ProjectNameField embedInActionCard emphasized />
							</CreateProjectActionCard>
						</div>

						<div className='shrink-0 border-t border-border/70 pt-6'>
							<ProjectTypeLandingField />
						</div>
					</div>

					<div className='flex min-h-0 min-w-0 flex-col gap-6 lg:flex-1'>
						<CreateSiteProjectIntro />
						<CreateSiteProjectThemeCustomize />
						<CreateSiteProjectSubmitButton
							prominent
							loading={creating}
							disabled={creating}
							className='mt-auto shrink-0'
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
