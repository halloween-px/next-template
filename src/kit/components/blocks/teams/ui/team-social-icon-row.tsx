import { Button } from '@/kit/components/ui/button';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Twitter } from 'lucide-react';

export type TeamMemberSocial = {
	linkedin: string;
	twitter: string;
	github: string;
};

type Props = {
	social: TeamMemberSocial;
	variant?: 'default' | 'compact';
	className?: string;
};

const LINKS: {
	key: keyof TeamMemberSocial;
	label: string;
	Icon: typeof Linkedin;
}[] = [
	{ key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
	{ key: 'twitter', label: 'Twitter', Icon: Twitter },
	{ key: 'github', label: 'GitHub', Icon: Github },
];

export function TeamSocialIconRow({ social, variant = 'default', className }: Props) {
	const iconClass = variant === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4';
	const btnClass =
		variant === 'compact'
			? 'h-8 w-8 hover:bg-primary/15'
			: 'h-8 w-8 hover:bg-primary/20';

	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{LINKS.map(({ key, label, Icon }) => (
				<Button key={key} size='icon' variant='ghost' className={btnClass} asChild>
					<a href={social[key]} target='_blank' rel='noopener noreferrer' aria-label={label}>
						<Icon className={iconClass} />
					</a>
				</Button>
			))}
		</div>
	);
}
