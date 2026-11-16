import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base semantic colors (CSS variables)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          container: 'hsl(var(--primary-container))',
          'container-foreground': 'hsl(var(--primary-container-foreground))',
          fixed: 'hsl(var(--primary-fixed))',
          'fixed-dim': 'hsl(var(--primary-fixed-dim))',
          'on-fixed': 'hsl(var(--on-primary-fixed))',
          'on-fixed-variant': 'hsl(var(--on-primary-fixed-variant))',
          hover: 'hsl(var(--primary-hover))',
          subtle: 'hsl(var(--primary-subtle))',
          inverse: 'hsl(var(--inverse-primary))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          container: 'hsl(var(--secondary-container))',
          'container-foreground': 'hsl(var(--on-secondary-container))',
          fixed: 'hsl(var(--secondary-fixed))',
          'fixed-dim': 'hsl(var(--secondary-fixed-dim))',
          'on-fixed': 'hsl(var(--on-secondary-fixed))',
          'on-fixed-variant': 'hsl(var(--on-secondary-fixed-variant))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
          container: 'hsl(var(--tertiary-container))',
          'container-foreground': 'hsl(var(--on-tertiary-container))',
          fixed: 'hsl(var(--tertiary-fixed))',
          'fixed-dim': 'hsl(var(--tertiary-fixed-dim))',
          'on-fixed': 'hsl(var(--on-tertiary-fixed))',
          'on-fixed-variant': 'hsl(var(--on-tertiary-fixed-variant))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          container: 'hsl(var(--destructive-container))',
          'container-foreground': 'hsl(var(--on-destructive-container))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Surface palette
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          dim: 'hsl(var(--surface-dim))',
          bright: 'hsl(var(--surface-bright))',
          'container-lowest': 'hsl(var(--surface-container-lowest))',
          'container-low': 'hsl(var(--surface-container-low))',
          container: 'hsl(var(--surface-container))',
          'container-high': 'hsl(var(--surface-container-high))',
          'container-highest': 'hsl(var(--surface-container-highest))',
          canvas: 'hsl(var(--surface-canvas))',
          subtle: 'hsl(var(--surface-subtle))',
          border: 'hsl(var(--surface-border))',
        },
        'on-surface': 'hsl(var(--on-surface))',
        'on-surface-variant': 'hsl(var(--on-surface-variant))',
        'inverse-surface': 'hsl(var(--inverse-surface))',
        'inverse-on-surface': 'hsl(var(--inverse-on-surface))',
        outline: 'hsl(var(--outline))',
        'outline-variant': 'hsl(var(--outline-variant))',
        'surface-tint': 'hsl(var(--surface-tint))',

        // Text colors
        'text-primary': 'hsl(var(--text-primary))',
        'text-muted': 'hsl(var(--text-muted))',

        // Fitment status colors
        'fitment-success': 'hsl(var(--fitment-success))',
        'fitment-warning': 'hsl(var(--fitment-warning))',

        // Chart colors (keep existing)
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        // Headlines use Chivo
        'headline-xl': ['var(--font-headline-xl)'],
        'headline-xl-mobile': ['var(--font-headline-xl-mobile)'],
        'headline-lg': ['var(--font-headline-lg)'],
        'headline-lg-mobile': ['var(--font-headline-lg-mobile)'],
        'headline-md': ['var(--font-headline-md)'],
        'headline-sm': ['var(--font-headline-sm)'],
        // Labels use Chivo (semibold/bold)
        'label-lg': ['var(--font-label-lg)'],
        'label-md': ['var(--font-label-md)'],
        'label-sm': ['var(--font-label-sm)'],
        // Body uses Inter
        'body-lg': ['var(--font-body-lg)'],
        'body-md': ['var(--font-body-md)'],
        'body-sm': ['var(--font-body-sm)'],
        // Sans fallback
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        'headline-xl': ['var(--text-headline-xl)', { lineHeight: 'var(--leading-headline-xl)', letterSpacing: 'var(--tracking-headline-xl)', fontWeight: 'var(--font-weight-headline-xl)' }],
        'headline-xl-mobile': ['var(--text-headline-xl-mobile)', { lineHeight: 'var(--leading-headline-xl-mobile)', letterSpacing: 'var(--tracking-headline-xl-mobile)', fontWeight: 'var(--font-weight-headline-xl-mobile)' }],
        'headline-lg': ['var(--text-headline-lg)', { lineHeight: 'var(--leading-headline-lg)', letterSpacing: 'var(--tracking-headline-lg)', fontWeight: 'var(--font-weight-headline-lg)' }],
        'headline-lg-mobile': ['var(--text-headline-lg-mobile)', { lineHeight: 'var(--leading-headline-lg-mobile)', letterSpacing: 'var(--tracking-headline-lg-mobile)', fontWeight: 'var(--font-weight-headline-lg-mobile)' }],
        'headline-md': ['var(--text-headline-md)', { lineHeight: 'var(--leading-headline-md)', fontWeight: 'var(--font-weight-headline-md)' }],
        'headline-sm': ['var(--text-headline-sm)', { lineHeight: 'var(--leading-headline-sm)', fontWeight: 'var(--font-weight-headline-sm)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body-lg)', fontWeight: 'var(--font-weight-body-lg)' }],
        'body-md': ['var(--text-body-md)', { lineHeight: 'var(--leading-body-md)', fontWeight: 'var(--font-weight-body-md)' }],
        'body-sm': ['var(--text-body-sm)', { lineHeight: 'var(--leading-body-sm)', fontWeight: 'var(--font-weight-body-sm)' }],
        'label-lg': ['var(--text-label-lg)', { lineHeight: 'var(--leading-label-lg)', letterSpacing: 'var(--tracking-label-lg)', fontWeight: 'var(--font-weight-label-lg)' }],
        'label-md': ['var(--text-label-md)', { lineHeight: 'var(--leading-label-md)', fontWeight: 'var(--font-weight-label-md)' }],
        'label-sm': ['var(--text-label-sm)', { lineHeight: 'var(--leading-label-sm)', letterSpacing: 'var(--tracking-label-sm)', fontWeight: 'var(--font-weight-label-sm)' }],
      },
      letterSpacing: {
        'headline-xl': 'var(--tracking-headline-xl)',
        'headline-xl-mobile': 'var(--tracking-headline-xl-mobile)',
        'headline-lg': 'var(--tracking-headline-lg)',
        'headline-lg-mobile': 'var(--tracking-headline-lg-mobile)',
        'label-lg': 'var(--tracking-label-lg)',
        'label-sm': 'var(--tracking-label-sm)',
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      fontWeight: {
        'headline-xl': 'var(--font-weight-headline-xl)',
        'headline-xl-mobile': 'var(--font-weight-headline-xl-mobile)',
        'headline-lg': 'var(--font-weight-headline-lg)',
        'headline-lg-mobile': 'var(--font-weight-headline-lg-mobile)',
        'headline-md': 'var(--font-weight-headline-md)',
        'headline-sm': 'var(--font-weight-headline-sm)',
        'body-lg': 'var(--font-weight-body-lg)',
        'body-md': 'var(--font-weight-body-md)',
        'body-sm': 'var(--font-weight-body-sm)',
        'label-lg': 'var(--font-weight-label-lg)',
        'label-md': 'var(--font-weight-label-md)',
        'label-sm': 'var(--font-weight-label-sm)',
      },
      spacing: {
        gutter: 'var(--spacing-gutter)',
        'gutter-desktop': 'var(--spacing-gutter-desktop)',
        margin: 'var(--spacing-margin)',
        'margin-desktop': 'var(--spacing-margin-desktop)',
        'space-xs': 'var(--spacing-space-xs)',
        'space-sm': 'var(--spacing-space-sm)',
        'space-md': 'var(--spacing-space-md)',
        'space-lg': 'var(--spacing-space-lg)',
        'space-xl': 'var(--spacing-space-xl)',
        'space-2xl': 'var(--spacing-space-2xl)',
      },
      boxShadow: {
        'elevation-1': 'var(--shadow-elevation-1)',
        'elevation-2': 'var(--shadow-elevation-2)',
        'elevation-3': 'var(--shadow-elevation-3)',
        'elevation-sticky': 'var(--shadow-elevation-sticky)',
        'automotive-card': 'var(--shadow-automotive-card)',
        'automotive-floating': 'var(--shadow-automotive-floating)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      backgroundImage: {
        'tech-grid': 'radial-gradient(#ffffff 1px, transparent 1px)',
        'automotive-gradient': 'linear-gradient(to top, #121316, #1C1E22, #121316)',
      },
      backgroundSize: {
        'tech-grid': '24px 24px',
      },
    },
  },
  plugins: [],
}

export default config