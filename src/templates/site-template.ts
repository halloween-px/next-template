import { getSiteCompanyInfo } from './company';
import { heroConfigV4 } from '@/kit/components/blocks/hero/config/_hero';
import { servicesConfigV2 } from '@/kit/components/blocks/services/config/_services';
import { portfoliosConfig } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { teamsConfig } from '@/kit/components/blocks/teams/config/_team';
import { reviewsConfig } from '@/kit/components/blocks/reviews/config/_reviews';
import { contactsConfig } from '@/kit/components/blocks/contacts/config/_contacts';
import { defaultAboutConfig } from './registry';
import { footerConfig } from '@/kit/components/blocks/footer/config/_footer';
import { headerConfig } from '@/kit/components/blocks/header/config/_header';

import { siteTechCompanyNavigation } from './navigation/site-tech-company';

export const siteConfig = {
	id: 'site-tech-company',
	siteName: 'TechCompany',
	theme: {
		palette: 'slate',
		themeLayers: {
			base: 'slate',
			accent: 'rose',
			chart: 'rose',
			style: 'lyra',
		},
		colorScheme: 'dark',
		primaryColor: 'blue',
		accentColor: 'cyan',
		fonts: {
			heading: 'Geist',
			body: 'Geist',
		},
	},

	companyInfo: getSiteCompanyInfo(),

	navigation: siteTechCompanyNavigation,

	header: headerConfig,

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
				heroConfigV4,
				defaultAboutConfig,
				servicesConfigV2,
				portfoliosConfig,
				teamsConfig,
				reviewsConfig,
				contactsConfig,
			],
		},
	],

	footer: footerConfig,
};
