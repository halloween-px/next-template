import { CONTACTS_TYPE } from '@/kit/components/blocks/contacts/config/_contacts';
import { HERO_TYPE } from '@/kit/components/blocks/hero/config/_hero';
import { PORTFOLIOS_TYPE } from '@/kit/components/blocks/portfolios/config/_portfolios';
import { REVIEWS_TYPE } from '@/kit/components/blocks/reviews/config/_reviews';
import { SERVICES_TYPE } from '@/kit/components/blocks/services/config/_services';
import { TEAMS_TYPE } from '@/kit/components/blocks/teams/config/_team';
import { ABOUT_TYPES } from '@/templates/registry/_about';
import { HEADER_TYPES } from '@/templates/registry/_header';
import { Block } from '@/types/site';

import dynamic from 'next/dynamic';
import { ComponentType, CSSProperties } from 'react';

const BLOCKS_MAP: Record<string, ComponentType<any>> = {
	[HEADER_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/header/v1')),
	[ABOUT_TYPES.V1]: dynamic(() => import('@/kit/components/blocks/about/v1')),
	[ABOUT_TYPES.V2]: dynamic(() => import('@/kit/components/blocks/about/v2')),

	[HERO_TYPE]: dynamic(() => import('@/kit/components/blocks/hero/v1')),
	[SERVICES_TYPE]: dynamic(() => import('@/kit/components/blocks/services/v1')),
	[PORTFOLIOS_TYPE]: dynamic(() => import('@/kit/components/blocks/portfolios/v1')),
	[TEAMS_TYPE]: dynamic(() => import('@/kit/components/blocks/teams/v1')),
	[REVIEWS_TYPE]: dynamic(() => import('@/kit/components/blocks/reviews/v1')),
	[CONTACTS_TYPE]: dynamic(() => import('@/kit/components/blocks/contacts/v1')),
};

const SectionRenderer = ({ section }: { section: Block; styles?: CSSProperties }) => {
	const type = section.type.toLowerCase();
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

	return <Template {...section.content} />;
};

export default SectionRenderer;
