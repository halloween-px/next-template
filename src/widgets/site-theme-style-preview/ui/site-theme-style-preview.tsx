'use client';

/**
 * Виджет хоста: мозаика превью UI (Style Overview) + сайдбар слоёв темы.
 * Слои base / accent / chart / style (`data-site-*` + светлая/тёмная).
 */
import '@/kit/styles/site-theme-layers.css';
import { resolveThemeLayers } from '@/kit/styles/registry';
import { useSiteProjectPreviewOptional } from '@/providers/site-project-preview-provider';
import { siteConfig } from '@/templates/site-template';
import type { ColorScheme, ThemeConfig } from '@/types/site';
import { SiteThemeStyleAside } from '@/features/site-theme-style-aside';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
	ActivityFeedListCard,
	FormsControlsShowcaseCard,
	KpiTrendSummaryCard,
	LucideIconToolbarCard,
	ProjectCoverMediaCard,
	SegmentsHorizontalScrollCard,
	StyleOverviewTokensCard,
	TabsOutlineShowcaseCard,
	TeamAvatarsRowCard,
	WeeklyChartBarsCard,
} from './cards';

const defaultPreviewTheme = {
	...siteConfig.theme,
	colorScheme: siteConfig.theme.colorScheme as ColorScheme,
} as ThemeConfig;

type SiteThemeStylePreviewProps = {
	theme?: ThemeConfig;
	/** Вызывается при любом изменении локальной темы (сайдбар / сброс). */
	onThemeChange?: (theme: ThemeConfig) => void;
};

export const SiteThemeStylePreview = ({ theme: themeProp, onThemeChange }: SiteThemeStylePreviewProps) => {
	const preview = useSiteProjectPreviewOptional();
	const [theme, setTheme] = useState<ThemeConfig>(
		() => themeProp ?? preview?.config.theme ?? defaultPreviewTheme
	);

	useEffect(() => {
		setTheme(themeProp ?? preview?.config.theme ?? defaultPreviewTheme);
	}, [themeProp, preview?.projectId]);

	useEffect(() => {
		onThemeChange?.(theme);
	}, [theme, onThemeChange]);

	const schemeClass = theme.colorScheme === 'dark' ? 'dark' : undefined;
	const layers = resolveThemeLayers(theme);

	const handleReset = () => {
		setTheme(themeProp ?? preview?.config.theme ?? defaultPreviewTheme);
	};

	return (
		<div className='box-border flex min-h-0 w-full min-w-0 max-w-full flex-1 flex-col gap-4 overflow-hidden p-3 sm:p-4 lg:flex-row lg:gap-6'>
			<SiteThemeStyleAside
				theme={theme}
				layers={layers}
				setTheme={setTheme}
				onReset={handleReset}
			/>

			<section
				data-site-base={layers.base}
				data-site-accent={layers.accent}
				data-site-chart={layers.chart}
				data-site-style={layers.style}
				className={cn(
					'site-preview-shell flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-background p-6 text-foreground shadow-sm',
					schemeClass
				)}
				style={{ fontFamily: `${theme.fonts.body}, system-ui, sans-serif` }}>
				<div className='min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain [scrollbar-gutter:stable]'>
					<div className='site-preview-mosaic mx-auto w-full min-w-0 max-w-[1680px] px-3 py-2 pb-12'>
						<div className='site-preview-grid site-preview-mosaic-grid grid grid-cols-1 items-start gap-6 xl:grid-cols-3'>
							<div className='flex min-h-0 min-w-0 flex-col gap-6'>
								<StyleOverviewTokensCard />
								<WeeklyChartBarsCard />
								<KpiTrendSummaryCard />
								<ActivityFeedListCard />
							</div>

							<div className='flex min-h-0 min-w-0 flex-col gap-6'>
								<LucideIconToolbarCard />
								<ProjectCoverMediaCard />
								<TeamAvatarsRowCard />
							</div>

							<div className='flex min-h-0 min-w-0 flex-col gap-6'>
								<SegmentsHorizontalScrollCard />
								<TabsOutlineShowcaseCard />
								<FormsControlsShowcaseCard />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
