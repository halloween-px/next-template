import { Container } from '@/kit/components/shared/container';
import { Button } from '@/kit/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
	return (
		<section className='relative py-section overflow-hidden'>
			<Container>
				<div className='max-w-3xl mx-auto text-center'>
					<h1 className='text-4xl md:text-6xl font-bold tracking-tight mb-6'>
						Enterprise шаблон на <span className='text-primary'>Next.js 14</span>
					</h1>
					<p className='text-xl text-muted-foreground mb-8'>
						Готовое решение для быстрого старта проектов любой сложности
					</p>
					<div className='flex gap-4 justify-center'>
						<Button variant='default' size='xl'>
							<Link href='#start'> Начать</Link>
						</Button>

						<Button variant='outline' size='xl'>
							<Link href='#docs'>Документация</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
}
