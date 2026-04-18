import { PRODUCT_NAME, PRODUCT_TAGLINE } from '@/config/product';
import { Container } from '../../shared/container';

export function Footer() {
	return (
		<footer className='border-t py-4 h-footer'>
			<Container>
				<div className='flex flex-col md:flex-row justify-between items-center'>
					<div className='mb-4 max-w-xl text-center md:mb-0 md:text-left'>
						<h3 className='text-lg font-bold'>{PRODUCT_NAME}</h3>
						<p className='mt-1 text-sm text-muted-foreground'>{PRODUCT_TAGLINE}</p>
						<p className='mt-2 text-xs text-muted-foreground/90'>
							Next.js · TypeScript · MongoDB
						</p>
					</div>
					<div className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} Все права защищены
					</div>
				</div>
			</Container>
		</footer>
	);
}
