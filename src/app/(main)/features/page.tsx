import type { Metadata } from 'next';
import { productPageTitle, PRODUCT_NAME, PRODUCT_TAGLINE } from '@/config/product';
import { ServicesSection } from '@/kit/components/marketing/sections/services-section';

export const metadata: Metadata = {
	title: productPageTitle('Возможности'),
	description: `Компонуемый kit, MongoDB и API, безопасность и тема в превью — что уже встроено в ${PRODUCT_NAME}. ${PRODUCT_TAGLINE}`,
};

export default function FeaturesPage() {
	return <ServicesSection />;
}
