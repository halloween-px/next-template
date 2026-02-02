import { Header } from '@/components/layout/landing-layout/header';
import { HeroSection } from '@/components/marketing/hero-section';
import { ServicesSection } from '@/components/marketing/services-section';
import { Footer } from '@/components/layout/landing-layout/footer';

export default function Home() {
	return (
		<>
			<HeroSection />
			<ServicesSection />
		</>
	);
}
