import { defaultAboutConfig } from '../registry/_about';

export const aboutPageConfig = {
	id: 'about-page',
	name: 'О компании',
	slug: '/about',
	meta: {
		title: 'TechCompany | Инновационные решения для вашего бизнеса',
		description:
			'Мы создаем современные веб-приложения, которые помогают компаниям расти и развиваться в цифровую эпоху',
	},
	sections: [defaultAboutConfig],
} as const;
