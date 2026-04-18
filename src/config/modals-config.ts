import { CreateSiteProjectModal } from '@/features/site-project/ui/create-site-project-modal';

export const MODALS_CONFIG = {
	createSiteProject: {
		id: 'createSiteProject',
		title: 'Новый сайт',
		description: 'Сначала укажите название сайта — без него проект не создаётся.',
		size: '6xl' as const,
		component: CreateSiteProjectModal,
	},
} as const;
