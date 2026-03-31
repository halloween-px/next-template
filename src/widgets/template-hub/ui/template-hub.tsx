import { ROUTES } from '@/config/routes';
import type { SiteProjectListItem } from '@/lib/db/site-project-queries';
import { Container } from '@/kit/components/shared/container';
import { Button } from '@/kit/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/kit/components/ui/card';
import Link from 'next/link';
import { SiteProjectCard } from '@/entities/site-project/ui/site-project-card';
import { CreateSiteProjectTrigger } from '@/features/create-site-project/ui/create-site-project-trigger';

type Props = {
	isLoggedIn: boolean;
	projects: SiteProjectListItem[];
	onCreateClick: () => void;
};

export function TemplateHub({ isLoggedIn, projects, onCreateClick }: Props) {
	return (
		<Container className='py-10 md:py-14'>
			<div className='mb-8 max-w-2xl'>
				<h1 className='text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>Мои сайты</h1>
				<p className='mt-2 text-muted-foreground'>
					Создайте вариант с нуля или откройте сохранённый — превью в том же шаблоне, что и в
					редакторе.
				</p>
			</div>

			{!isLoggedIn ? (
				<Card className='max-w-md border-dashed'>
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
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
					<CreateSiteProjectTrigger onClick={onCreateClick} />
					{projects.map((project) => (
						<SiteProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</Container>
	);
}
