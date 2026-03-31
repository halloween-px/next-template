import { infoblocksConfig } from '@/kit/components/blocks/infoblocks/config/_infoblocks';
import { statsConfig } from '@/kit/components/blocks/stats/config/_stats';
import { TAbout } from '../type';

export const ABOUT_ID = 'section-about';

const aboutContent = {
	title: 'О компании',
	subtitle: 'Создаем будущее вместе с вами',
	description:
		'Наша команда специализируется на разработке современных веб-приложений и мобильных решений. Мы объединяем креативность, технологический опыт и бизнес-понимание для создания продуктов, которые действительно работают.',
	mission:
		'Мы — команда профессионалов, которая превращает идеи в реальность. Наша миссия — создавать инновационные решения, которые помогают бизнесу расти и развиваться в цифровую эпоху.',
	parts: [
		{ type: 'stats-v1' as const, content: statsConfig.content },
		{ type: 'infoblocks-v1' as const, content: infoblocksConfig.content },
	],
	links: [{ label: 'Подробнее', href: '/about' }],
	image: 'modern-office-collaboration.png',
};

export const aboutConfig: TAbout = {
	id: ABOUT_ID,
	type: 'about-v1',
	content: { ...aboutContent },
};
