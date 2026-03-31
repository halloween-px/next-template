import { heroConfig } from '@/kit/components/blocks/hero/config/_hero';
import { servicesConfig } from '@/kit/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/kit/components/blocks/teams/config/_team';
import { reviewsConfig } from '@/kit/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/kit/components/blocks/contacts/config/_contacts';
import { footerConfig } from '@/kit/components/blocks/footer/config/_footer';
import { defaultAboutConfig } from './registry/_about';
import { aboutPageConfig } from './pages';

export const corporateTemplate = {
	id: 'corporate-site',
	siteName: 'TechCompany',
	theme: {
		colorScheme: 'dark',
		primaryColor: 'blue',
		accentColor: 'cyan',
		fonts: {
			heading: 'Geist',
			body: 'Geist',
		},
	},
	pages: [
		{
			id: 'main-landing',
			name: 'Главная',
			slug: '/',
			meta: {
				title: 'TechCompany | Инновационные решения для вашего бизнеса',
				description:
					'Мы создаем современные веб-приложения, которые помогают компаниям расти и развиваться в цифровую эпоху',
			},
			sections: [
				heroConfig,
				defaultAboutConfig,
				servicesConfig,
				portfoliosConfig,
				teamsConfig,
				reviewsConfig,
				contactsConfig,
			],
		},
		aboutPageConfig,
	],
	footer: footerConfig,
};
