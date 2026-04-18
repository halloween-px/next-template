import { HERO_ID, HERO_TYPES, type THero } from './_hero.constants';

/** hero-v4: полноэкранный слайдер + заявка в правом нижнем углу */
export const heroConfigV4: THero = {
	id: HERO_ID,
	type: HERO_TYPES.V4,
	content: {
		autoplay: true,
		interval: 6500,
		leadForm: {
			preset: 'lead-short',
			shell: 'card',
			title: 'Оставьте заявку',
			subtitle: 'Свяжемся в течение рабочего дня',
			submitLabel: 'Отправить заявку',
		},
		slides: [
			{
				eyebrow: 'Студия разработки',
				title: 'Продукты, которые держат нагрузку и сроки',
				description:
					'От прототипа до продакшена — одна команда, понятные вехи и код, который не стыдно передать внутрь.',
				backgroundImage: '/images/hero/futuristic-technology-abstract.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [
					{ label: 'Запланировать звонок', link: '#contacts', modal: 'orderCall' },
					{ label: 'Кейсы', link: '#portfolio' },
				],
				tags: ['Web', 'Mobile', 'API'],
			},
			{
				eyebrow: 'Инфраструктура',
				title: 'Наблюдаемость и отказоустойчивость с первого дня',
				description:
					'Метрики, алерты и сценарии отката — не после инцидента, а в проектировании.',
				backgroundImage: '/images/hero/innovation-abstract-blue.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [{ label: 'Аудит архитектуры', link: '#' }],
				tags: ['SRE', 'K8s', 'Observability'],
			},
			{
				eyebrow: 'Сопровождение',
				title: 'После релиза вы не остаетесь один на один с продакшеном',
				description:
					'Доработки по приоритету, мониторинг и предсказуемая поддержка — в одном контракте.',
				backgroundImage: '/images/hero/success-growth-abstract.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [{ label: 'Обсудить SLA', link: '#contacts', modal: 'discussProject' }],
				tags: ['SLA', 'Roadmap', 'Support'],
			},
		],
	},
};
