'use client';

import { SITE_THEME_BASES } from '@/kit/styles/registry';
import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';
import type { SiteThemeBaseId } from '@/types/site';
import { BASE_LAYER_LABELS } from './theme-layer-labels';

export type BaseLayerFieldProps = {
	value: SiteThemeBaseId;
	onChange: (next: SiteThemeBaseId) => void;
};

export function BaseLayerField({ value, onChange }: BaseLayerFieldProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='spc-base'>Нейтральная гамма</Label>
			<Select value={value} onValueChange={(v) => onChange(v as SiteThemeBaseId)}>
				<SelectTrigger id='spc-base' className='h-10 w-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SITE_THEME_BASES.map((id) => (
						<SelectItem key={id} value={id}>
							{BASE_LAYER_LABELS[id]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
