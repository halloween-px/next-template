import { Header } from '@/components/layout/landing-layout/header';
import { HeroSection } from '@/components/features/landing/hero-section';
import { ServicesSection } from '@/components/features/landing/services-section';
import { Footer } from '@/components/layout/landing-layout/footer';

export default function Home() {
	return (
		<>
			<HeroSection />
			<ServicesSection />
		</>
	);
}
