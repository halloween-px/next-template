import { Container } from '../../shared/container';

export function Footer() {
	return (
		<footer className='border-t py-4 h-footer'>
			<Container>
				<div className='flex flex-col md:flex-row justify-between items-center'>
					<div className='mb-4 md:mb-0'>
						<h3 className='text-lg font-bold'>Template</h3>
						<p className='text-sm text-muted-foreground'>Enterprise шаблон на Next.js 14</p>
					</div>
					<div className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} Все права защищены
					</div>
				</div>
			</Container>
		</footer>
	);
}
