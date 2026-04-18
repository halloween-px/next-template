import { infoblocksConfig } from '@/kit/components/blocks/infoblocks/config/_infoblocks';
import { statsConfig } from '@/kit/components/blocks/stats/config/_stats';
import { TAbout } from '../type';

export const ABOUT_ID = 'section-about';

const aboutContentV1 = {
	title: 'О компании',
	subtitle: 'Создаем будущее вместе с вами',
	description:
		'Наша команда специализируется на разработке современных веб-приложений и мобильных решений. Мы объединяем креативность, технологический опыт и бизнес-понимание для создания продуктов, которые действительно работают.',
	mission:
		'Мы — команда профессионалов, которая превращает идеи в реальность. Наша миссия — создавать инновационные решения, которые помогают бизнесу расти и развиваться в цифровую эпоху.',
	stats: statsConfig.content.items,
	infoblocks: infoblocksConfig.content.items,
	links: [{ label: 'Подробнее', href: '/about' }],
	image: 'modern-office-collaboration.png',
};

const aboutContentV2 = {
	title: 'Команда и подход',
	subtitle: 'Про продукт, процесс и людей',
	description:
		'Мы строим долгие отношения с клиентами: от первого созвона до сопровождения после релиза. Прозрачные сроки, понятная архитектура кода и единый контакт по проекту — чтобы вам не пришлось разбираться в десяти чатах.\n\n' +
		'Работаем итерациями: сначала согласуем объём и приоритеты, затем показываем работающий инкремент, собираем обратную связь и только после этого расширяем функциональность. Так проще держать бюджет под контролем и не тонуть в правках «на глаз». После запуска помогаем с мониторингом и доработками',
	mission:
		'Наша цель — не «сдать ТЗ», а запустить решение, которым реально пользуются люди каждый день.',
	facts: [
		{ label: 'На рынке', value: '15+ лет' },
		{ label: 'Проектов', value: '500+' },
		{ label: 'Команда', value: '50+' },
	],
	highlights: [
		{
			title: 'Инженерия',
			description:
				'Code review, автотесты там, где это окупается, и документация для тех, кто придёт после нас.',
		},
		{
			title: 'Продукт',
			description: 'Задаём вопросы про метрики и пользователей раньше, чем рисуем экраны.',
		},
		{
			title: 'Надёжность',
			description:
				'Учитываем нагрузку, резервные сценарии и типичные угрозы ещё на этапе проектирования API.',
		},
		{
			title: 'Связь',
			description:
				'Короткие статусы, демо по итерациям и понятные отчёты — вы всегда знаете, на каком этапе проект.',
		},
	],
	links: [{ label: 'Связаться', href: '#contacts', modal: 'contact' as const }],
	image: 'modern-office-collaboration.png',
};

export const aboutConfig: TAbout = {
	id: ABOUT_ID,
	type: 'about-v1',
	content: { ...aboutContentV1 },
};

export const aboutConfigV2: TAbout = {
	id: ABOUT_ID,
	type: 'about-v2',
	content: { ...aboutContentV2 },
};
