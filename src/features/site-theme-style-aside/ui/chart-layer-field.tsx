'use client';

import { SITE_THEME_CHARTS } from '@/kit/styles/registry';
import { Label } from '@/kit/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/kit/components/ui/select';
import { cn } from '@/lib/utils';
import type { SiteThemeChartId } from '@/types/site';
import { CHART_LAYER_LABELS } from './theme-layer-labels';
import { THEME_ACCENT_SWATCH_CLASSES } from './theme-accent-swatch-classes';

export type ChartLayerFieldProps = {
	value: SiteThemeChartId;
	onChange: (next: SiteThemeChartId) => void;
};

export function ChartLayerField({ value, onChange }: ChartLayerFieldProps) {
	return (
		<div className='space-y-2'>
			<Label htmlFor='spc-chart'>Цвета для графиков</Label>
			<p className='text-[11px] leading-snug text-muted-foreground'>
				Те же оттенки, что у акцента: диаграммы и графики подстроятся под выбранную палитру.
			</p>
			<Select value={value} onValueChange={(v) => onChange(v as SiteThemeChartId)}>
				<SelectTrigger id='spc-chart' className='h-10 w-full'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{SITE_THEME_CHARTS.map((id) => (
						<SelectItem key={id} value={id}>
							<span className='flex items-center gap-2'>
								<span
									className={cn(
										'size-3.5 shrink-0 rounded-sm ring-1 ring-border/60',
										THEME_ACCENT_SWATCH_CLASSES[id]
									)}
									aria-hidden
								/>
								<span>{CHART_LAYER_LABELS[id]}</span>
							</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
