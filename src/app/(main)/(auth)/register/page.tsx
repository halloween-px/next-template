import { Container } from '@/kit/components/shared/container';
import { RegisterForm } from '@/kit/features/auth/register-form';
import Image from 'next/image';
import { Suspense } from 'react';

const Register = () => {
	return (
		<section className='h-[calc(100vh-var(--height-header))]'>
			<Container className='h-full'>
				<div className='grid lg:grid-cols-2 h-full items-center'>
					<div className='flex flex-col gap-4 p-6'>
						<div className='flex flex-1 items-center justify-center'>
							<div className='w-full max-w-xs'>
								<Suspense fallback={null}>
									<RegisterForm />
								</Suspense>
							</div>
						</div>
					</div>
					<div className='bg-muted relative hidden lg:block aspect-square'>
						<Image
							width={100}
							height={100}
							className='object-cover h-full w-full rounded-2xl'
							src={'/images/login.png'}
							alt='login'
							priority
							sizes='100%'
						/>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Register;
