import { ROUTES } from '@/config/routes';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { Container } from '@/kit/components/shared/container';
import { Button } from '@/kit/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/kit/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SiteProjectCard } from '@/entities/site-project/ui/site-project-card';
import { CreateSiteProjectTrigger } from '@/features/site-project/ui/create-site-project-trigger';
import { DeleteSiteProjectButton } from '@/features/site-project/ui/delete-site-project-button';
import { SiteProjectsHubHeader } from '@/widgets/site-projects/ui/site-projects-hub-header';

type Props = {
	isLoggedIn: boolean;
	projects: SiteProjectListItem[];
};

/** Список сохранённых сайтов + кнопка «Новый сайт» (модалка через store). */
export function SiteProjectsList({ isLoggedIn, projects }: Props) {
	return (
		<div className='relative'>
			<div
				className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(56vh,520px)] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,hsl(var(--primary)/0.18),transparent)]'
				aria-hidden
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(56vh,520px)] opacity-[0.28]',
					'bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)]',
					'bg-size-[4rem_4rem]',
				)}
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute right-0 top-24 -z-10 size-[min(85vw,380px)] rounded-full bg-violet-500/10 blur-3xl'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -left-20 bottom-40 -z-10 size-64 rounded-full bg-primary/10 blur-3xl md:size-80'
				aria-hidden
			/>

			<Container className='relative z-10 py-14 pb-16 md:py-20 md:pb-24'>
				<SiteProjectsHubHeader />

				{!isLoggedIn ? (
					<Card className='max-w-md border-dashed border-primary/20 bg-card/80 backdrop-blur-sm'>
						<CardHeader>
							<CardTitle>Войдите в аккаунт</CardTitle>
							<CardDescription>Чтобы создавать и сохранять сайты, нужна авторизация.</CardDescription>
						</CardHeader>
						<div className='flex gap-2 px-6 pb-6'>
							<Button asChild>
								<Link href={`/login?callbackUrl=${encodeURIComponent(ROUTES.template)}`}>Войти</Link>
							</Button>
							<Button variant='outline' asChild>
								<Link href='/register'>Регистрация</Link>
							</Button>
						</div>
					</Card>
				) : (
					<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
						<CreateSiteProjectTrigger />
						{projects.map((project) => (
							<SiteProjectCard
								key={project.id}
								project={project}
								footer={<DeleteSiteProjectButton projectId={project.id} />}
							/>
						))}
					</div>
				)}
			</Container>
		</div>
	);
}
