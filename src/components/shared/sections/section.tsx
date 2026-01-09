import { cn } from '@/lib/utils';

type SectionProps = {
	children: React.ReactNode;
	className?: string;
	id?: string;
};

export const Section = ({ children, id, className }: SectionProps) => {
	return (
		<section id={id} className={cn('relative py-section overflow-hidden', className)}>
			{children}
		</section>
	);
};
