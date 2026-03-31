import { CONTACTS_TYPE } from '@/kit/components/blocks/contacts/config/_contacts';
import { FOOTER_TYPES } from '@/templates/registry/_footer';
import { INFOBLOCKS_TYPES } from '@/templates/registry/_infoblocks';
import { STATS_TYPES } from '@/templates/registry/_stats';
import { HERO_TYPE } from '@/kit/components/blocks/hero/config/_hero';
import { PORTFOLIOS_TYPE } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { REVIEWS_TYPE } from '@/kit/components/blocks/reviews/config/_reviews';
import { SERVICES_TYPE } from '@/kit/components/blocks/services/config/_services';
import { TEAMS_TYPE } from '@/kit/components/blocks/teams/config/_team';
import type { THeaderProps } from '@/kit/components/blocks/header/type';
import { mergeHeaderWithSiteNavigation } from '@/lib/navigation/mergeHeaderNavigation';
import { ABOUT_TYPES } from '@/templates/registry/_about';
import { HEADER_TYPES } from '@/templates/registry/_header';
import { siteConfig } from '@/templates/site-template';
import type { NavigationConfig } from '@/types/site';
import { Block } from '@/types/site';

import dynamic from 'next/dynamic';
import { ComponentType, CSSProperties } from 'react';

const HEADER_TYPE_SET = new Set<string>([HEADER_TYPES.V1, HEADER_TYPES.V2]);

const BLOCKS_MAP: Record<string, ComponentType<any>> = {
	[HEADER_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/header/v1')),
	/** Пока отдельного v2 нет — тот же компонент, что и v1 */
	[HEADER_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/header/v1')),
	[ABOUT_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/about/v1')),
	[ABOUT_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/about/v2')),

	[HERO_TYPE]: dynamic(() => import('@/kit/components/blocks/hero/v1')),
	[SERVICES_TYPE]: dynamic(() => import('@/kit/components/blocks/services/v1')),
	[PORTFOLIOS_TYPE]: dynamic(() => import('@/kit/components/blocks/portfolios/v1')),
	[TEAMS_TYPE]: dynamic(() => import('@/kit/components/blocks/teams/v1')),
	[REVIEWS_TYPE]: dynamic(() => import('@/kit/components/blocks/reviews/v1')),
	[CONTACTS_TYPE]: dynamic(() => import('@/kit/components/blocks/contacts/v1')),
	[FOOTER_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/footer/v1')),
	[STATS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/stats/v1')),
	[INFOBLOCKS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/infoblocks/v1')),
};

const SectionRenderer = ({
	section,
	styles,
	siteNavigation,
}: {
	section: Block;
	styles?: CSSProperties;
	/** Для превью сохранённого проекта — навигация из его конфига. */
	siteNavigation?: NavigationConfig;
}) => {
	const type = String(section?.type ?? '').toLowerCase();
	const Template = BLOCKS_MAP[type];

	if (!Template) {
		return (
			<div style={{ border: '2px dashed red', padding: '20px', margin: '10px' }}>
				<h3>⚠️ Block Not Found</h3>
				<p>
					Received type: <strong>{String(type)}</strong>
				</p>
				<p>Available types: {Object.keys(BLOCKS_MAP).join(', ')}</p>
				<pre style={{ fontSize: '10px' }}>{JSON.stringify(section, null, 2)}</pre>
			</div>
		);
	}

	const nav = siteNavigation ?? siteConfig.navigation;
	const content = HEADER_TYPE_SET.has(type)
		? mergeHeaderWithSiteNavigation(section.content as THeaderProps, nav)
		: section.content;

	return <Template {...content} />;
};

export default SectionRenderer;
