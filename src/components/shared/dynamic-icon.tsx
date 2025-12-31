import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
	name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
	const formatName = name.charAt(0).toUpperCase() + name.slice(1);

	const LucideIcon = (Icons as any)[formatName];

	if (!LucideIcon) {
		return null;
	}

	return <LucideIcon {...props} />;
};
