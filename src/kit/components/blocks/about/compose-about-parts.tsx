import StatsV1 from '@/kit/components/blocks/stats/v1';
import InfoblocksV1 from '@/kit/components/blocks/infoblocks/v1';
import type { AboutPart } from './type';

export function ComposeAboutParts({ parts }: { parts: AboutPart[] }) {
	return (
		<>
			{parts.map((part, index) => {
				const key = `${part.type}-${index}`;
				switch (part.type) {
					case 'stats-v1':
						return <StatsV1 key={key} {...part.content} embedded />;
					case 'infoblocks-v1':
						return <InfoblocksV1 key={key} {...part.content} embedded />;
				}
			})}
		</>
	);
}

export function resolveAboutParts(content: {
	parts?: AboutPart[];
	stats?: Array<{ value: string; label: string }>;
	infoblocks?: Array<{ icon: string; title: string; description: string }>;
}): AboutPart[] {
	if (content.parts?.length) {
		return content.parts;
	}
	const out: AboutPart[] = [];
	if (content.stats?.length) {
		out.push({ type: 'stats-v1', content: { items: content.stats } });
	}
	if (content.infoblocks?.length) {
		out.push({ type: 'infoblocks-v1', content: { items: content.infoblocks } });
	}
	return out;
}
