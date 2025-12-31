import SectionRenderer from '@/core/renderer';
import { landingTemplate } from '@/templates/landing';

const Template = () => {
	const pages = landingTemplate.pages;

	return (
		<>
			{pages.map(({ sections, id }) => (
				<div key={id}>
					{sections.map((section) => {
						return <SectionRenderer section={section} key={section.id} />;
					})}
				</div>
			))}
		</>
	);
};

export default Template;
