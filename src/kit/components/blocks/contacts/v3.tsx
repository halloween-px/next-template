'use client';

import Image from 'next/image';
import { Badge } from '@/kit/components/ui/badge';
import { Card, CardContent } from '@/kit/components/ui/card';
import { Typography } from '@/kit/components/ui/typography';
import { DynamicIcon } from '@/kit/components/shared/dynamic-icon';
import { Container } from '@/kit/components/shared/container';
import { Section } from '@/kit/components/shared/sections/section';
import type { SectionTitleVariant } from '@/kit/components/shared/sections/section-title';
import { SectionTitle } from '@/kit/components/shared/sections/section-title';
import { ContactsForm } from './ui/contacts-form';
import type { TContactsContent } from './types';
import type { SectionTextAlign } from '@/types/section-layout';
import { cn } from '@/lib/utils';
import { flexJustifyFromAlign } from '@/lib/section-align';

const IMG_BASE = '/images';
const FALLBACK_IMAGE = '/placeholder.svg';

/**
 * Contacts v3 — на md+: слева половина секции под фото, справа заголовок, чипы контактов и форма.
 * На узких экранах: фото сверху, блок с формой ниже.
 */
export default function ContactsV3({
	title,
	subtitle,
	description,
	contactInfo,
	formFields,
	splitImage,
	sectionTitleVariant = 'default',
	sectionTitleAlign,
	sectionBodyAlign,
}: TContactsContent & { sectionTitleVariant?: SectionTitleVariant }) {
	const titleAlign: SectionTextAlign = sectionTitleAlign ?? 'center';
	const bodyAlign: SectionTextAlign = sectionBodyAlign ?? titleAlign;

	const src = splitImage ? `${IMG_BASE}/${splitImage}` : FALLBACK_IMAGE;

	return (
		<Section id='contact' className='relative overflow-hidden px-0'>
			<div className='grid min-h-[min(100vh,920px)] lg:grid-cols-2 lg:min-h-[min(85vh,880px)]'>
				{/* Фото — половина ширины на больших экранах */}
				<div className='relative min-h-[260px] lg:min-h-full'>
					<Image
						src={src}
						alt={title}
						fill
						className='object-cover'
						sizes='(max-width: 1024px) 100vw, 50vw'
						priority={false}
					/>
					<div
						className='absolute inset-0 bg-linear-to-t from-background/90 via-background/25 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-background/15 lg:to-background/85'
						aria-hidden
					/>
				</div>

				{/* Форма и текст */}
				<div className='flex flex-col justify-center bg-background px-4 py-12 sm:px-8 lg:px-12 lg:py-16 xl:px-16'>
					<Container className='px-0'>
						<SectionTitle
							variant={sectionTitleVariant}
							title={title}
							subtitle={subtitle}
							description={description}
							align={titleAlign}
							descriptionAlign={bodyAlign}
						/>

						<div className={cn('mt-8 flex flex-wrap gap-2 md:mt-10', flexJustifyFromAlign(bodyAlign))}>
							{contactInfo.map((item, i) => (
								<Badge
									key={`${item.label}-${i}`}
									variant='outline'
									className='h-auto max-w-full gap-2 border-border/80 bg-muted/30 px-3 py-2 text-left font-normal shadow-sm'>
									<DynamicIcon name={item.icon} className='size-4 shrink-0 text-primary' aria-hidden />
									{item.href ? (
										<a href={item.href} className='truncate font-medium hover:text-primary'>
											{item.value}
										</a>
									) : (
										<span className='truncate'>{item.value}</span>
									)}
								</Badge>
							))}
						</div>

						<Card className='mt-10 border-border/70 shadow-lg'>
							<CardContent className='p-8 md:p-10'>
								<Typography.Title level={4} className='mb-6'>
									Напишите нам
								</Typography.Title>
								<ContactsForm
									fields={formFields}
									layout='stacked'
									idPrefix='c3'
									submitClassName='h-12 w-full bg-primary text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 md:h-12'
								/>
							</CardContent>
						</Card>
					</Container>
				</div>
			</div>
		</Section>
	);
}
