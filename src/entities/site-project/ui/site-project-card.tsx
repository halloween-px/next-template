import { ROUTES } from '@/config/routes';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/kit/components/ui/card';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
	project: SiteProjectListItem;
	/** Например кнопка удаления из feature-слоя */
	footer?: ReactNode;
};

export function SiteProjectCard({ project, footer }: Props) {
	return (
		<Card className='h-full min-h-[180px] transition-shadow hover:shadow-md'>
			<Link href={ROUTES.templateProject(project.id)} className='block'>
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
			</Link>
			{footer ? <CardFooter className='flex justify-end'>{footer}</CardFooter> : null}
		</Card>
	);
}
