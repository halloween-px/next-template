'use client';

import { ROUTES } from '@/config/routes';
import SectionRenderer from '@/core/renderer';
import Breadcrumbs from '@/kit/components/blocks/breadcrumbs/breadcrumbs';
import { TemplateLayout } from '@/kit/components/layouts/template-layout/template-layout';
import { siteConfig } from '@/templates/site-template';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

const Layout = ({ children, params }: PropsWithChildren<{ params: { slug: string[] } }>) => {
	const pathName = params.slug?.length ? `/${params.slug.join('/')}` : '/';
	const currnetSlug = pathName === ROUTES.template ? '/' : pathName.replace(ROUTES.template, '');
	const isHome = currnetSlug === '/';
	const currentPage = siteConfig.pages.find((page) => page.slug === currnetSlug);
	const router = useRouter();

	const DRAWER_WIDTH = 360;
	const [open, setOpen] = useState(true);
	const [vw, setVw] = useState<number>(0);

	useEffect(() => {
		const update = () => setVw(window.innerWidth || 0);
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	const scale = useMemo(() => {
		if (!open) return 1;
		if (!vw) return 1;
		const raw = (vw - DRAWER_WIDTH) / vw;
		// clamp so it doesn't become ridiculous on small screens
		return Math.max(0.6, Math.min(1, raw));
	}, [open, vw]);

	const close = () => {
		setOpen(false);
		window.setTimeout(() => {
			router.push('/template', { scroll: false });
		}, 220);
	};

	return (
		<TemplateLayout>
			<div className='relative min-h-screen overflow-hidden'>
				<aside
					className={
						'fixed left-0 top-0 z-30 h-screen w-[360px] border-r border-white/10 bg-neutral-950/95 backdrop-blur ' +
						'transition-transform duration-[220ms] will-change-transform ' +
						(open ? 'translate-x-0' : '-translate-x-[360px]')
					}>
					<div className='flex items-center justify-between p-4'>
						<div className='font-semibold'>Настройки</div>
						<button
							type='button'
							onClick={close}
							className='rounded-md px-2 py-1 text-sm opacity-80 hover:opacity-100'>
							Закрыть
						</button>
					</div>

					<div className='p-4 text-sm opacity-85'>Выбери блок…</div>
				</aside>

				{/* Canvas */}
				<div
					className='relative z-10 min-w-0 origin-top-left transition-all'
					style={{
						width: open ? `calc(100vw - ${DRAWER_WIDTH}px)` : '100vw',
						transform: open ? `translateX(${DRAWER_WIDTH}px)` : 'translateX(0px) scale(1)',
					}}>
					<div style={{ zoom: scale }}>
						<SectionRenderer section={siteConfig.header} />

						{!isHome && (
							<Breadcrumbs segments={[{ label: currentPage?.name || '', href: currnetSlug }]} />
						)}

						{children}
					</div>
				</div>
			</div>
		</TemplateLayout>
	);
};

export default Layout;
