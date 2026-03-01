'use client';

import { useBuilderStore } from '@/stores/slices/site-store';
import SectionRenderer from '@/core/renderer';

export default function TemplateBuilderPage() {
	const sections = useBuilderStore((s) => s.sections);

	return (
		<>
			{sections?.map((section) => (
				<SectionRenderer key={section.id} section={section} />
			))}
		</>
	);
}
