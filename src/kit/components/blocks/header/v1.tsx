import Link from 'next/link';
import { Button } from '@/kit/components/ui/button';
import { Container } from '@/kit/components/shared/container';
import { THeaderProps } from './type';
import { Logo } from '@/kit/components/shared/logo';
import { Navigation } from '@/kit/components/shared/navigation/navigation';
import { SheetMobileMenu } from './sheet/mobile-menu';

export default function HeaderV1({
	linkToMain,
	navigationData,
	navigationVariant = 'menu',
	buttons,
}: THeaderProps) {
	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<Container>
				<div className='container flex h-16 items-center justify-between'>
					<Logo linkToMain={linkToMain} />
					<Navigation navigationData={navigationData} variant={navigationVariant} />

					<div className='hidden md:flex md:items-center md:gap-2'>
						{buttons &&
							buttons.map((button) => (
								<Button key={button.label} variant={button.variant || 'ghost'} asChild>
									<Link href={button.href}>{button.label}</Link>
								</Button>
							))}
					</div>

					{/* Mobile Menu */}
					<SheetMobileMenu navigationData={navigationData} buttons={buttons} />
				</div>
			</Container>
		</header>
	);
}
