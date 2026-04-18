'use client';

import { SITE_THEME_STYLES } from '@/kit/styles/registry';
import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';
import type { SiteThemeStyleId } from '@/types/site';
import { STYLE_LAYER_LABELS } from './theme-layer-labels';

export type StyleLayerFieldProps = {
	value: SiteThemeStyleId;
	onChange: (next: SiteThemeStyleId) => void;
};

export function StyleLayerField({ value, onChange }: StyleLayerFieldProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='spc-style'>Форма и плотность</Label>
			<p className='text-[11px] leading-snug text-muted-foreground'>
				Скругления, отступы и обводки — отдельно от палитры, чтобы быстро сменить «характер» макета.
			</p>
			<Select value={value} onValueChange={(v) => onChange(v as SiteThemeStyleId)}>
				<SelectTrigger id='spc-style' className='h-10 w-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SITE_THEME_STYLES.map((id) => (
						<SelectItem key={id} value={id}>
							{STYLE_LAYER_LABELS[id]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
