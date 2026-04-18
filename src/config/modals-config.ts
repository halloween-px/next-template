import { CreateSiteProjectModal } from '@/features/site-project/ui/create-site-project-modal';

export const MODALS_CONFIG = {
	createSiteProject: {
		id: 'createSiteProject',
		title: 'Создание сайта',
		description: 'Создайте новый сайт на основе шаблона',
		size: '5xl' as const,
		component: CreateSiteProjectModal,
	},
} as const;
