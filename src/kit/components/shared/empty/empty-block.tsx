import { ArrowUpRightIcon } from 'lucide-react';

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/kit/components/ui/empty';
import { ReactNode } from 'react';

type EmptyBlockProps = {
	title: string;
	description?: string;
	buttons?: Array<ReactNode>;
	content?: ReactNode;
};

export function EmptyBlock({ title, buttons, content }: EmptyBlockProps) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<ArrowUpRightIcon />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>
					You haven&apos;t created any projects yet. Get started by creating your first project.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				{buttons && <div className='flex gap-2'>{buttons.map((button) => button)}</div>}
				{content && content}
			</EmptyContent>
		</Empty>
	);
}
