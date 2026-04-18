import { ROUTES } from '@/config/routes';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Clock, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
	project: SiteProjectListItem;
	/** Например кнопка удаления из feature-слоя */
	footer?: ReactNode;
};

export function SiteProjectCard({ project, footer }: Props) {
	const updated = new Date(project.updatedAt);
	const created = new Date(project.createdAt);
	const showCreated = Math.abs(updated.getTime() - created.getTime()) > 60_000;

	return (
		<Card
			className={cn(
				'group relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-2xl border-border/65',
				'bg-linear-to-br from-card/95 via-card/88 to-muted/30 shadow-sm',
				'gap-0 py-0 transition-all duration-300',
				'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/12',
			)}>
			<Link
				href={ROUTES.templateProject(project.id)}
				className={cn(
					'flex min-h-0 flex-1 flex-col rounded-t-2xl outline-none',
					'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
				)}>
				<CardHeader className='space-y-0 px-5 pb-2 pt-5 sm:px-6'>
					<div className='flex gap-3'>
						<span
							className={cn(
								'flex size-11 shrink-0 items-center justify-center rounded-xl',
								'bg-primary/12 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18 group-hover:ring-primary/30',
							)}>
							<LayoutTemplate className='size-5 text-primary' aria-hidden />
						</span>
						<div className='min-w-0 flex-1'>
							<CardTitle className='line-clamp-2 text-base font-semibold leading-snug tracking-tight sm:text-lg'>
								{project.name}
							</CardTitle>
							<p className='mt-2 text-xs leading-relaxed text-muted-foreground'>
								Блоки, тема и превью — откроете тот же экран, что и в редакторе.
							</p>
						</div>
					</div>
				</CardHeader>

				<CardContent className='flex flex-1 flex-col px-5 pb-4 pt-0 sm:px-6'>
					<div className='mt-auto space-y-2.5 border-t border-border/55 pt-4 text-xs text-muted-foreground'>
						<div className='flex items-start gap-2.5'>
							<Clock className='mt-0.5 size-3.5 shrink-0 text-primary/70' aria-hidden />
							<span className='leading-snug'>
								<span className='font-medium text-foreground/90'>Изменён</span>{' '}
								<time dateTime={project.updatedAt}>
									{updated.toLocaleString('ru-RU', {
										dateStyle: 'medium',
										timeStyle: 'short',
									})}
								</time>
							</span>
						</div>
						{showCreated ? (
							<div className='flex items-start gap-2.5'>
								<Calendar className='mt-0.5 size-3.5 shrink-0 text-primary/70' aria-hidden />
								<span className='leading-snug'>
									<span className='font-medium text-foreground/90'>Создан</span>{' '}
									<time dateTime={project.createdAt}>
										{created.toLocaleString('ru-RU', {
											dateStyle: 'medium',
											timeStyle: 'short',
										})}
									</time>
								</span>
							</div>
						) : null}
					</div>
					<p className='mt-4 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary'>
						Открыть редактор
					</p>
				</CardContent>
			</Link>

			{footer ? (
				<CardFooter className='flex justify-end border-t border-border/60 bg-muted/20 px-5 py-3 sm:px-6'>
					{footer}
				</CardFooter>
			) : null}
		</Card>
	);
}
