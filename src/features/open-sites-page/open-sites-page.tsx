import { Button } from '@/kit/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type OpenSitesPageProps = {
	className?: string;
};

export const OpenSitesPage = ({ className }: OpenSitesPageProps) => {
	return (
		<Button type='button' variant='secondary' asChild>
			<Link href='/template' className={cn('', className)}>
				← Мои сайты
			</Link>
		</Button>
	);
};
