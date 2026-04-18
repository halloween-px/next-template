'use client';

import { Card, CardContent } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import { SectionBackground } from '@/kit/components/shared/sections/section-background';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { cn } from '@/lib/utils';
import { ContactsForm } from './ui/contacts-form';
import type { TContactsContent } from './types';
import type { SectionTextAlign } from '@/types/section-layout';
import { marginInlineAutoFromAlign } from '@/lib/section-align';

/**
 * Contacts v2 — контакты слева колонкой с акцентной границей, форма справа на широкой карточке;
 * фон с боковым сиянием.
 */
export default function ContactsV2({
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
			<SectionBackground variant='sides-shine' />

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
						'mt-12 grid max-w-6xl gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-14',
						marginInlineAutoFromAlign(bodyAlign),
					)}>
					<div className='flex flex-col gap-8 border-l-4 border-primary pl-6 lg:col-span-4'>
						<Typography.Title level={4} className='text-balance'>
							Реквизиты и связь
						</Typography.Title>
						<ul className='space-y-8'>
							{contactInfo.map((item, i) => (
								<li key={`${item.label}-${i}`} className='flex gap-4'>
									<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted ring-1 ring-border'>
										<DynamicIcon name={item.icon} className='size-5 text-primary' aria-hidden />
									</span>
									<div className='min-w-0'>
										<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
											{item.label}
										</p>
										{item.href ? (
											<a
												href={item.href}
												className={cn(
													'mt-1 block text-base font-medium text-foreground underline-offset-4 hover:text-primary hover:underline',
												)}>
												{item.value}
											</a>
										) : (
											<p className='mt-1 text-base font-medium'>{item.value}</p>
										)}
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className='lg:col-span-8'>
						<Card className='border border-border/70 bg-card/95 shadow-2xl ring-1 ring-border/40'>
							<CardContent className='p-8 md:p-10'>
								<Typography.Title level={4} className='mb-2'>
									Сообщение
								</Typography.Title>
								<Typography.Text color='muted' className='mb-8'>
									Все поля, кроме отмеченных, обязательны для отправки.
								</Typography.Text>
								<ContactsForm fields={formFields} layout='split' idPrefix='c2' />
							</CardContent>
						</Card>
					</div>
				</div>
			</Container>
		</Section>
	);
}
