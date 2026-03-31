'use client';

import { AnchorLink } from '@/kit/components/shared/AnchorLink';
import { Container } from '@/kit/components/shared/container';
import { cn } from '@/lib/utils';
import { company, getFooterContacts } from '@/templates/company';
import {
	MessageCircle,
	Send,
	Phone,
	Mail,
	MapPin,
	Github,
	Twitter,
	Linkedin,
	Facebook,
	type LucideIcon,
} from 'lucide-react';
import type { TFooterContent, FooterContact, FooterSocial } from './type';

const DEFAULT_CONTACTS: FooterContact[] = getFooterContacts();

const contactIconMap: Record<NonNullable<FooterContact['iconKey']>, LucideIcon> = {
	phone: Phone,
	mail: Mail,
	map: MapPin,
};

function contactIconFor(label: string, href: string): LucideIcon {
	const lower = `${label} ${href}`.toLowerCase();
	if (lower.includes('tel') || lower.includes('phone') || href.startsWith('tel:')) return Phone;
	if (lower.includes('mail') || href.startsWith('mailto:')) return Mail;
	return MapPin;
}

const socialIconMap: Record<string, LucideIcon> = {
	telegram: Send,
	whatsapp: MessageCircle,
	github: Github,
	twitter: Twitter,
	linkedin: Linkedin,
	facebook: Facebook,
};

function normalizePlatform(platform: string): string {
	return platform.toLowerCase().replace(/[^a-z]/g, '');
}

function socialHref(item: FooterSocial): string {
	return item.href ?? item.url ?? '#';
}

export default function FooterV1({
	tagline,
	companyInfo,
	columns = [],
	contacts,
	social = [],
	copyright,
	ctas,
	bottomLinks,
}: TFooterContent) {
	const name = companyInfo?.name ?? company.name;
	const description = companyInfo?.description ?? company.description;

	const contactRows = contacts?.length ? contacts : DEFAULT_CONTACTS;

	const ctaPrimary = ctas?.[0] ?? {
		label: 'Связаться',
		href: '#contact',
		variant: 'default' as const,
	};
	const ctaSecondary = ctas?.[1] ?? {
		label: 'Портфолио',
		href: '#portfolio',
		variant: 'outline' as const,
	};

	const footerLinks = bottomLinks?.length
		? bottomLinks
		: [
				{ label: 'Политика конфиденциальности', href: '/privacy' },
				{ label: 'Пользовательское соглашение', href: '/terms' },
			];

	const year = new Date().getFullYear();

	const ctaSolid =
		'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90';
	const ctaOutline =
		'border border-border bg-background text-foreground hover:bg-muted';

	return (
		<footer id='footer' className='relative w-full overflow-hidden border-t border-border bg-background text-foreground'>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-0 text-foreground opacity-[0.06]'
				style={{
					backgroundImage: `repeating-linear-gradient(
						-12deg,
						transparent,
						transparent 12px,
						currentColor 12px,
						currentColor 13px
					)`,
				}}
			/>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-0 bg-linear-to-t from-muted/25 via-transparent to-background'
			/>

			<Container className='relative z-10'>
				<div className='flex flex-col gap-5 border-b border-border py-8 md:flex-row md:items-center md:justify-between md:gap-6 md:py-9'>
					<div className='min-w-0 max-w-2xl md:flex-1'>
						<p className='mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
							{name}
						</p>
						<h2 className='mb-2 text-balance text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl'>
							{tagline ?? company.tagline}
						</h2>
						<p className='text-pretty text-sm leading-relaxed text-muted-foreground'>{description}</p>
					</div>

					<div className='flex shrink-0 flex-wrap gap-2 md:justify-end'>
						<AnchorLink
							href={ctaPrimary.href}
							className={cn(
								'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors',
								ctaPrimary.variant === 'outline' ? ctaOutline : ctaSolid,
							)}>
							{ctaPrimary.label}
						</AnchorLink>
						<AnchorLink
							href={ctaSecondary.href}
							className={cn(
								'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors',
								ctaSecondary.variant === 'default' ? ctaSolid : ctaOutline,
							)}>
							{ctaSecondary.label}
						</AnchorLink>
					</div>
				</div>

				<div className='flex flex-col gap-8 py-7 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:py-9'>
					<div className='flex min-w-0 flex-1 flex-wrap gap-x-10 gap-y-6 sm:gap-x-12'>
						{columns.map((column, index) => (
							<div key={`${column.title}-${index}`} className='min-w-[140px]'>
								<p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
									{column.title}
								</p>
								<ul className='space-y-1.5'>
									{column.links?.map((item) => (
										<li key={`${item.label}-${item.href}`}>
											<AnchorLink
												href={item.href}
												className='text-sm text-muted-foreground transition-colors hover:text-foreground'>
												{item.label}
											</AnchorLink>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className='w-full shrink-0 border-t border-border pt-6 lg:w-[min(100%,290px)] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'>
						<p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
							Связь
						</p>
						<ul className='space-y-2.5'>
							{contactRows.map((item) => {
								const Icon = item.iconKey
									? contactIconMap[item.iconKey]
									: contactIconFor(item.label, item.href);
								return (
									<li key={`${item.label}-${item.href}`}>
										<AnchorLink
											href={item.href}
											className='group flex items-start gap-2.5 transition-opacity hover:opacity-95'>
											<Icon
												className='mt-0.5 h-4 w-4 shrink-0 text-muted-foreground'
												aria-hidden
											/>
											<span className='min-w-0'>
												<span className='block text-[11px] uppercase tracking-wider text-muted-foreground'>
													{item.label}
												</span>
												<span className='block text-sm font-medium leading-snug text-foreground'>
													{item.value}
												</span>
											</span>
										</AnchorLink>
									</li>
								);
							})}
						</ul>

						{social.length > 0 ? (
							<div className='mt-5'>
								<p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
									Соцсети
								</p>
								<div className='flex flex-wrap gap-1.5'>
									{social.map((item) => {
										const key = normalizePlatform(item.platform);
										const Icon = socialIconMap[key] ?? MessageCircle;
										const href = socialHref(item);
										return (
											<AnchorLink
												key={`${item.platform}-${href}`}
												href={href}
												title={item.platform}
												className='flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground/30 hover:bg-muted'>
												<Icon className='h-4 w-4' aria-hidden />
												<span className='sr-only'>{item.platform}</span>
											</AnchorLink>
										);
									})}
								</div>
							</div>
						) : null}
					</div>
				</div>

				<div className='flex flex-col gap-3 border-t border-border py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:text-sm'>
					<p className='min-w-0 text-pretty'>
						{copyright ?? `© ${year} ${name}. Все права защищены.`}
					</p>
					<nav aria-label='Нижнее меню' className='flex flex-wrap gap-x-5 gap-y-1.5 md:justify-end'>
						{footerLinks.map((item) => (
							<AnchorLink
								key={`${item.label}-${item.href}`}
								href={item.href}
								className='transition-colors hover:text-foreground'>
								{item.label}
							</AnchorLink>
						))}
					</nav>
				</div>
			</Container>
		</footer>
	);
}
