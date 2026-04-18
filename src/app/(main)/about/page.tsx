import type { Metadata } from 'next';
import { productPageTitle, PRODUCT_NAME, PRODUCT_TAGLINE } from '@/config/product';
import { AboutMarketingPage } from '@/kit/components/marketing/about/about-marketing-page';

export const metadata: Metadata = {
	title: productPageTitle('О нас'),
	description: `Зачем создан ${PRODUCT_NAME}: единый kit и основа для роста продукта. ${PRODUCT_TAGLINE}`,
};

export default function AboutPage() {
	return <AboutMarketingPage />;
}
