import { TTeams } from '../types';

export const TEAMS_ID = 'section-teams';
export const TEAMS_TYPE = 'teams-v1';

export const teamsConfig: TTeams = {
	id: TEAMS_ID,
	type: TEAMS_TYPE,
	content: {
		title: 'Наша команда',
		subtitle: 'Познакомьтесь с нашей командой',
		description: 'Профессионалы, которые создают выдающиеся цифровые продукты',
		teams: [
			{
				id: '1',
				name: 'Алексей Иванов',
				role: 'CEO & Основатель',
				image: 'team-member-1.jpg',
				bio: '15+ лет опыта в разработке и управлении IT-проектами',
				social: {
					linkedin: '#',
					twitter: '#',
					github: '#',
				},
			},
			{
				id: '2',
				name: 'Мария Петрова',
				role: 'CTO & Lead Developer',
				image: 'team-member-2.jpg',
				bio: 'Эксперт в современных технологиях и архитектуре приложений',
				social: {
					linkedin: '#',
					twitter: '#',
					github: '#',
				},
			},
			{
				id: '3',
				name: 'Дмитрий Смирнов',
				role: 'UI/UX Designer',
				image: 'team-member-3.jpg',
				bio: 'Создает интуитивные и красивые пользовательские интерфейсы',
				social: {
					linkedin: '#',
					twitter: '#',
					github: '#',
				},
			},
			{
				id: '4',
				name: 'Елена Волкова',
				role: 'Product Manager',
				image: 'team-member-4.jpg',
				bio: 'Специалист по управлению продуктами и бизнес-стратегии',
				social: {
					linkedin: '#',
					twitter: '#',
					github: '#',
				},
			},
		],
	},
};
