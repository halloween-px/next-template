import { ROUTES } from '@/config/routes';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { Card, CardDescription, CardHeader, CardTitle } from '@/kit/components/ui/card';
import Link from 'next/link';

type Props = {
	project: SiteProjectListItem;
};

export function SiteProjectCard({ project }: Props) {
	return (
		<Link href={ROUTES.templateProject(project.id)} className='block'>
			<Card className='h-full min-h-[180px] transition-shadow hover:shadow-md'>
				<CardHeader>
					<CardTitle className='line-clamp-2 text-lg'>{project.name}</CardTitle>
					<CardDescription>
						Обновлён:{' '}
						{new Date(project.updatedAt).toLocaleString('ru-RU', {
							dateStyle: 'short',
							timeStyle: 'short',
						})}
					</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
}
