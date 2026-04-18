'use client';

import { DEFAULT_THEME_LAYERS } from '@/kit/styles/registry';
import { Button } from '@/kit/components/ui/button';
import type { ThemeConfig, ThemeLayers } from '@/types/site';
import type { Dispatch, SetStateAction } from 'react';
import { patchThemeLayers } from './model/patch-theme-layers';
import { AccentLayerField } from './ui/accent-layer-field';
import { BaseLayerField } from './ui/base-layer-field';
import { ChartLayerField } from './ui/chart-layer-field';
import { ColorSchemeField } from './ui/color-scheme-field';
import { StyleLayerField } from './ui/style-layer-field';

export type SiteThemeStyleAsideProps = {
	theme: ThemeConfig;
	layers: ThemeLayers;
	setTheme: Dispatch<SetStateAction<ThemeConfig>>;
	onReset: () => void;
};

export function SiteThemeStyleAside({ theme, layers, setTheme, onReset }: SiteThemeStyleAsideProps) {
	return (
		<aside className='flex h-full w-full shrink-0 flex-col space-y-4 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm lg:w-[280px] lg:max-w-none lg:shrink-0 lg:overflow-y-auto'>
			<div className='space-y-1.5'>
				<h3 className='text-sm font-semibold tracking-tight'>Тема оформления</h3>
				<p className='text-xs leading-relaxed text-muted-foreground'>
					Подберите нейтраль и акцент, цвета для графиков и общую «плотность» интерфейса — настройки не
					мешают друг другу.
				</p>
			</div>

			<ColorSchemeField
				value={theme.colorScheme}
				onChange={(next) => setTheme((t) => ({ ...t, colorScheme: next }))}
			/>

			<BaseLayerField
				value={layers.base}
				onChange={(base) => setTheme((t) => patchThemeLayers(t, { base }))}
			/>

			<AccentLayerField
				value={layers.accent}
				onChange={(accent) => setTheme((t) => patchThemeLayers(t, { accent }))}
			/>

			<ChartLayerField
				value={layers.chart}
				onChange={(chart) => setTheme((t) => patchThemeLayers(t, { chart }))}
			/>

			<StyleLayerField
				value={layers.style ?? DEFAULT_THEME_LAYERS.style}
				onChange={(style) => setTheme((t) => patchThemeLayers(t, { style }))}
			/>

			<Button type='button' variant='outline' size='sm' className='mt-auto w-full' onClick={onReset}>
				Вернуть тему по умолчанию
			</Button>
		</aside>
	);
}
