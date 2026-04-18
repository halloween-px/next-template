import { CONTACTS_TYPES } from '@/kit/components/blocks/contacts/config/_contacts';
import { FOOTER_TYPES } from '@/templates/registry/_footer';
import { INFOBLOCKS_TYPES } from '@/templates/registry/_infoblocks';
import { STATS_TYPES } from '@/templates/registry/_stats';
import { HERO_TYPES } from '@/kit/components/blocks/hero/config/_hero';
import { PORTFOLIOS_TYPES } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { REVIEWS_TYPES } from '@/kit/components/blocks/reviews/config/_reviews';
import { SERVICES_TYPES } from '@/kit/components/blocks/services/config/_services';
import { TEAMS_TYPES } from '@/kit/components/blocks/teams/config/_team';
import type { THeaderProps } from '@/kit/components/blocks/header/type';
import { mergeHeaderWithSiteNavigation } from '@/lib/navigation/mergeHeaderNavigation';
import { ABOUT_TYPES } from '@/templates/registry/_about';
import { HEADER_TYPES } from '@/templates/registry/_header';
import { siteConfig } from '@/templates/site-template';
import type { NavigationConfig } from '@/types/site';
import type { SiteCompanyInfo } from '@/types/site-company-info';
import type { SiteUiKit } from '@/types/site-ui-kit';
import { mergeSiteUiKit } from '@/types/site-ui-kit';
import { Block } from '@/types/site';
import { resolveSectionAlignFromContent } from '@/lib/section-align';

import dynamic from 'next/dynamic';
import { ComponentType, CSSProperties } from 'react';

const BLOCKS_MAP: Record<string, ComponentType<any>> = {
	[HEADER_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/header/v1')),
	/** Пока отдельного v2 нет — тот же компонент, что и v1 */
	[HEADER_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/header/v1')),
	[ABOUT_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/about/v1')),
	[ABOUT_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/about/v2')),

	[HERO_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/hero/v1')),
	[HERO_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/hero/v2')),
	[HERO_TYPES.V3]: dynamic(() => import('@/kit/components/blocks/hero/v3')),
	[HERO_TYPES.V4]: dynamic(() => import('@/kit/components/blocks/hero/v4')),
	[SERVICES_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/services/v1')),
	[SERVICES_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/services/v2')),
	[PORTFOLIOS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/portfolios/v1')),
	[PORTFOLIOS_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/portfolios/v2')),
	[PORTFOLIOS_TYPES.V3]: dynamic(() => import('@/kit/components/blocks/portfolios/v3')),
	[TEAMS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/teams/v1')),
	[TEAMS_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/teams/v2')),
	[TEAMS_TYPES.V3]: dynamic(() => import('@/kit/components/blocks/teams/v3')),
	[REVIEWS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/reviews/v1')),
	[REVIEWS_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/reviews/v2')),
	[REVIEWS_TYPES.V3]: dynamic(() => import('@/kit/components/blocks/reviews/v3')),
	[CONTACTS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/contacts/v1')),
	[CONTACTS_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/contacts/v2')),
	[CONTACTS_TYPES.V3]: dynamic(() => import('@/kit/components/blocks/contacts/v3')),
	[FOOTER_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/footer/v1')),
	[STATS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/stats/v1')),
	[INFOBLOCKS_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/infoblocks/v1')),
};

const SectionRenderer = ({
	section,
	styles,
	siteNavigation,
	/** Из `SiteConfig.uiKit` в превью билдера; для экспортируемого сайта не передаётся — дефолты. */
	siteUiKit,
	companyInfo,
}: {
	section: Block;
	styles?: CSSProperties;
	siteNavigation?: NavigationConfig;
	siteUiKit?: Partial<SiteUiKit>;
	companyInfo?: SiteCompanyInfo | null;
}) => {
	const rawType = String(section?.type ?? '').toLowerCase();
	/** Устаревшие типы (например снятые варианты шапки) → безопасный дефолт */
	const type =
		BLOCKS_MAP[rawType] !== undefined
			? rawType
			: rawType.startsWith('header-')
				? HEADER_TYPES.V1
				: rawType;
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
	const content = rawType.startsWith('header-')
		? mergeHeaderWithSiteNavigation(section.content as THeaderProps, nav, companyInfo ?? undefined)
		: section.content;

	const statsOrInfoblocks =
		type.startsWith('stats-') || type.startsWith('infoblocks-') ? { sectionId: section.id } : {};

	const ui = mergeSiteUiKit(siteUiKit);
	const align = resolveSectionAlignFromContent(content);

	return (
		<Template
			{...(content as object)}
			{...statsOrInfoblocks}
			sectionTitleVariant={ui.sectionTitle}
			sectionTitleAlign={align.sectionTitleAlign}
			sectionBodyAlign={align.sectionBodyAlign}
		/>
	);
};

export default SectionRenderer;
