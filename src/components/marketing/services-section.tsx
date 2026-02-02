import { Container } from '@/components/shared/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Database, Shield, Code } from 'lucide-react';

const services = [
	{
		icon: Settings,
		title: 'Полная настройка',
		description: 'Гибкая конфигурация под любой проект',
	},
	{
		icon: Database,
		title: 'База данных',
		description: 'MongoDB с оптимизированными моделями',
	},
	{
		icon: Shield,
		title: 'Безопасность',
		description: 'Аутентификация, авторизация, защита роутов',
	},
	{
		icon: Code,
		title: 'Чистый код',
		description: 'TypeScript, лучшие практики, масштабируемость',
	},
];

export function ServicesSection() {
	return (
		<section className='py-section'>
			<Container>
				<div className='text-center mb-12'>
					<h2 className='text-3xl font-bold tracking-tight mb-4'>Готовые модули</h2>
					<p className='text-lg text-muted-foreground'>Выбирай только то, что нужно для проекта</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{services.map((service) => (
						<Card key={service.title} className='hover:shadow-lg transition-shadow'>
							<CardHeader>
								<service.icon className='h-10 w-10 text-primary mb-4' />
								<CardTitle>{service.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground'>{service.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</Container>
		</section>
	);
}
