'use client';

import { Card, CardContent } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { ContactsForm } from './ui/contacts-form';
import type { TContactsContent } from './types';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';
import { marginInlineAutoFromAlign } from '@/lib/section-align';

/**
 * Contacts v1 — форма слева (широкая колонка), карточки контактов справа;
 * фон «орбы» как в прежней версии.
 */
export default function ContactsV1({
	title,
	subtitle,
	description,
	contactInfo,
	formFields,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TContactsContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	return (
		<Section id='contact' className='relative overflow-hidden'>
			<SectionBackground variant='orbs-animated' />

			<Container>
				<SectionTitle
					variant={sectionTitleVariant}
					title={title}
					subtitle={subtitle}
					description={description}
					align={titleAlign}
					descriptionAlign={bodyAlign}
				/>

				<div
					className={cn(
						'mt-12 grid max-w-7xl gap-8 lg:mt-14 lg:grid-cols-5 lg:gap-10',
						marginInlineAutoFromAlign(bodyAlign),
					)}>
					<div className='lg:col-span-3'>
						<Card className='border-2 border-border/60 bg-background/85 py-1 shadow-xl backdrop-blur-xl'>
							<CardContent className='p-8 md:p-10'>
								<div className='space-y-3'>
									<Typography.Title level={4}>Отправить сообщение</Typography.Title>
									<Typography.Text color='muted' className='mb-6'>
										Заполните форму — ответим в рабочие часы в течение одного дня.
									</Typography.Text>
								</div>
								<ContactsForm fields={formFields} layout='split' idPrefix='c1' />
							</CardContent>
						</Card>
					</div>

					<div className='flex flex-col gap-6 lg:col-span-2'>
						{contactInfo.map((item) => (
							<Card
								key={`${item.label}-${item.value}`}
								className='border-2 border-border/55 bg-background/85 shadow-lg backdrop-blur-xl transition-colors hover:border-primary/40'>
								<CardContent className='p-6'>
									<div className='flex items-start gap-4'>
										<div className='flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md'>
											<DynamicIcon name={item.icon} className='size-7' aria-hidden />
										</div>
										<div className='min-w-0 flex-1'>
											<p className='mb-1 text-lg font-bold'>{item.label}</p>
											{item.href ? (
												<a
													href={item.href}
													className='text-muted-foreground transition-colors hover:text-primary'>
													{item.value}
												</a>
											) : (
												<p className='text-muted-foreground'>{item.value}</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</Container>
		</Section>
	);
}
