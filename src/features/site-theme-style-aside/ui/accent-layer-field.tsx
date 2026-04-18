'use client';

import { SITE_THEME_ACCENTS } from '@/kit/styles/registry';
import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';
import { cn } from '@/lib/utils';
import type { SiteThemeAccentId } from '@/types/site';
import { ACCENT_LAYER_LABELS } from './theme-layer-labels';
import { THEME_ACCENT_SWATCH_CLASSES } from './theme-accent-swatch-classes';

export type AccentLayerFieldProps = {
	value: SiteThemeAccentId;
	onChange: (next: SiteThemeAccentId) => void;
};

export function AccentLayerField({ value, onChange }: AccentLayerFieldProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='spc-accent'>Акцентный цвет</Label>
			<Select value={value} onValueChange={(v) => onChange(v as SiteThemeAccentId)}>
				<SelectTrigger id='spc-accent' className='h-10 w-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SITE_THEME_ACCENTS.map((id) => (
						<SelectItem key={id} value={id}>
							<span className='flex items-center gap-2'>
								<span
									className={cn(
										'size-3.5 shrink-0 rounded-sm ring-1 ring-border/60',
										THEME_ACCENT_SWATCH_CLASSES[id]
									)}
									aria-hidden
								/>
								<span>{ACCENT_LAYER_LABELS[id]}</span>
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
