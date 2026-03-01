import Link from 'next/link';

export const Logo = ({ linkToMain }: { linkToMain?: string }) => {
	return (
		<Link href={linkToMain || '/'} className='flex items-center gap-2'>
			<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
				<span className='text-lg font-bold text-primary-foreground'>V</span>
			</div>
			<span className='text-xl font-bold'>Vercel</span>
		</Link>
	);
};
