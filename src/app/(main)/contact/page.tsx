import type { Metadata } from 'next';
import { productPageTitle, PRODUCT_NAME } from '@/config/product';
import { ContactMarketingPage } from '@/kit/components/marketing/contact/contact-marketing-page';

export const metadata: Metadata = {
	title: productPageTitle('Контакты'),
	description: `Свяжитесь с командой ${PRODUCT_NAME}: телефон, email и GitHub. Индивидуальные сайты и доработка блоков — напишите нам.`,
};

export default function ContactPage() {
	return <ContactMarketingPage />;
}
