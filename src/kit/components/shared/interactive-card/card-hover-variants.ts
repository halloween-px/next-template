import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Корень интерактивной карточки: `group` + lift/shadow по пресету.
 * Выбор пресета: проп `preset` или поле в данных (например `service.cardHover`).
 */
export const cardHoverRootVariants = cva(
	'group border border-border/50 bg-card/80 backdrop-blur-sm relative overflow-hidden',
	{
		variants: {
			preset: {
				lift: 'p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
				subtle:
					'p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5',
				none: 'p-6',
			},
		},
		defaultVariants: {
			preset: 'lift',
		},
	}
);

export const cardHoverIconWrapVariants = cva(
	'w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 shadow-lg transition-all duration-300',
	{
		variants: {
			preset: {
				lift: 'group-hover:scale-110 group-hover:rotate-3',
				subtle: 'group-hover:scale-105',
				none: '',
			},
		},
		defaultVariants: {
			preset: 'lift',
		},
	}
);

/** Оверлей с градиентом: задаёте `className` с `bg-gradient-to-br …` отдельно (из данных). */
export const cardHoverGradientOverlayVariants = cva('absolute inset-0 bg-gradient-to-br transition-opacity duration-300', {
	variants: {
		preset: {
			lift: 'opacity-0 group-hover:opacity-100',
			subtle: 'opacity-0 group-hover:opacity-100',
			none: 'opacity-0 pointer-events-none',
		},
	},
	defaultVariants: {
		preset: 'lift',
	},
});

export type CardHoverPreset = NonNullable<VariantProps<typeof cardHoverRootVariants>['preset']>;
