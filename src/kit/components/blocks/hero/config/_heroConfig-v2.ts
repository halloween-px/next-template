import { HERO_ID, HERO_TYPES, type THero } from './_hero.constants';

/** hero-v2: акцент на стеклянной карточке, переключение слайдов табами, eyebrow / tags / quote */
export const heroConfigV2: THero = {
	id: HERO_ID,
	type: HERO_TYPES.V2,
	content: {
		autoplay: false,
		interval: 6000,
		slides: [
			{
				eyebrow: 'Платформа нового поколения',
				title: 'Запускайте продукты быстрее рынка',
				description:
					'Единая команда, прозрачные итерации и код, который не стыдно передать в поддержку. От идеи до метрик в продакшене — без бюрократии и «ещё недельку».',
				backgroundImage: '/images/hero/futuristic-technology-abstract.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [
					{ label: 'Обсудить проект', link: '#contacts', modal: 'discussProject' },
					{ label: 'Смотреть кейсы', link: '#portfolio' },
				],
				tags: ['Next.js', 'TypeScript', 'Design system', 'CI/CD'],
				quote: '«Сроки держали даже когда мы сами не знали, чего хотим» — лид e-commerce проекта',
				leftAccent: {
					label: 'Три опоры поставки',
					caption:
						'Продукт и приоритеты, инженерия и стек, рост по метрикам — не «сначала дизайн, потом код», а один контур, в котором всё согласовано до релиза.',
					images: [
						{ src: '/images/hero/futuristic-technology-abstract.jpg', alt: 'Продукт и технологии' },
						{ src: '/images/hero/innovation-abstract-blue.jpg', alt: 'Инновации' },
						{ src: '/images/hero/success-growth-abstract.jpg', alt: 'Рост и метрики' },
					],
				},
				asideCard: {
					title: 'С чего начать',
					intro:
						'Расскажите в двух словах задачу — предложим формат созвона и следующий шаг без давления с продажами.',
					rows: [
						{
							icon: 'Calendar',
							label: 'Первый созвон',
							value:
								'30–45 минут, Zoom или звонок. Без обязательств и без NDA до обсуждения деталей.',
						},
						{
							icon: 'ClipboardList',
							label: 'Что иметь под рукой',
							value:
								'Цели, желаемые сроки, референсы или ссылка на текущий продукт — чем больше контекста, тем точнее оценка.',
						},
						{
							icon: 'Clock',
							label: 'Ответ по проекту',
							value: 'Первичная оценка и варианты подхода — в течение одного рабочего дня.',
						},
					],
				},
			},
			{
				eyebrow: 'Масштабирование',
				title: 'Инфраструктура, которая не ломается в пик',
				description:
					'Проектируем под нагрузку заранее: мониторинг, алерты, резервные сценарии и понятные runbook’и для вашей команды.',
				backgroundImage: '/images/hero/innovation-abstract-blue.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [{ label: 'Технический аудит', link: '#' }],
				tags: ['Kubernetes', 'Observability', 'SRE'],
				leftAccent: {
					label: 'Что держит систему под нагрузкой',
					caption:
						'Наблюдаемость, масштаб и инфраструктура — три слоя, которые мы проектируем вместе: видеть узкие места до пользователя, выдерживать пик и откатываться без паники.',
					images: [
						{ src: '/images/hero/innovation-abstract-blue.jpg', alt: 'Наблюдаемость' },
						{ src: '/images/hero/success-growth-abstract.jpg', alt: 'Масштаб' },
						{ src: '/images/hero/futuristic-technology-abstract.jpg', alt: 'Инфраструктура' },
					],
				},
				asideCard: {
					title: 'Надёжность',
					intro: 'Сразу закладываем наблюдаемость и сценарии отказа — не «потом починим».',
					rows: [
						{
							icon: 'Gauge',
							label: 'SLO / SLA',
							value:
								'Целевой аптайм и время реакции фиксируем в договоре, метрики — в открытом доступе для команды.',
						},
						{
							icon: 'Layers',
							label: 'Резерв и масштаб',
							value:
								'Горизонтальное масштабирование, health-check’и и откат релиза до выката в бой.',
						},
						{
							icon: 'Siren',
							label: 'Инциденты',
							value:
								'Он-call рота, эскалация, постмортем с действиями — без бесконечных «разборов полётов».',
						},
						{
							icon: 'BookOpen',
							label: 'Runbook’и',
							value:
								'Короткие инструкции для вашей команды: что смотреть ночью и кого будить в первую очередь.',
						},
					],
				},
			},
			{
				eyebrow: 'Сопровождение',
				title: 'Релиз — это начало, не финиш',
				description:
					'Помогаем после запуска: доработки, A/B, онбординг пользователей и развитие продукта по данным, а не по догадкам.',
				backgroundImage: '/images/hero/success-growth-abstract.jpg',
				contentPosition: { x: 'left', y: 'center' },
				buttons: [{ label: 'Запросить план', link: '#contacts', modal: 'contact' }],
				tags: ['SLA', 'Поддержка', 'Roadmap'],
				quote: 'Среднее время ответа по критическим инцидентам — в пределах договора.',
				leftAccent: {
					label: 'После запуска не «передаём ключи»',
					caption:
						'Сопровождение, развитие по данным и предсказуемая поддержка — один поток: доработки, эксперименты и инциденты идут через ту же команду, что знает продукт.',
					images: [
						{ src: '/images/hero/success-growth-abstract.jpg', alt: 'Сопровождение' },
						{ src: '/images/hero/futuristic-technology-abstract.jpg', alt: 'Развитие продукта' },
						{ src: '/images/hero/innovation-abstract-blue.jpg', alt: 'Команда' },
					],
				},
				asideCard: {
					title: 'После релиза',
					intro: 'Продолжаем отвечать за продукт: не только баги, но и развитие по данным.',
					rows: [
						{
							icon: 'Activity',
							label: 'Наблюдаемость',
							value:
								'Дашборды, алерты, логи и трассировки — договорённости по тем, что считаем инцидентом.',
						},
						{
							icon: 'Kanban',
							label: 'Бэклог',
							value:
								'Приоритизация по impact/effort, короткие итерации и прозрачный статус по задачам.',
						},
						{
							icon: 'MessageCircle',
							label: 'Коммуникация',
							value: 'Один канал с командой, регулярные демо и письменные статусы по SLA.',
						},
						{
							icon: 'LifeBuoy',
							label: 'Поддержка',
							value:
								'Уровни серьёзности, время реакции и эскалация — как в договоре, без сюрпризов.',
						},
					],
				},
			},
		],
	},
};
