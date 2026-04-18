'use client';

import { PRODUCT_NAME } from '@/config/product';

export function CreateSiteProjectIntro() {
	return (
		<p className='border-l-2 border-primary/30 pl-3 text-xs leading-relaxed text-muted-foreground'>
			Новый сайт в <span className='font-medium text-foreground'>«{PRODUCT_NAME}»</span> — отдельный конфиг в
			аккаунте: превью, блоки kit и тема. Другие проекты от этого не зависят.
		</p>
	);
}
