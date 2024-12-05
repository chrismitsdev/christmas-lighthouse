import type {Config} from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    data: {
      open: 'state="open"',
      closed: 'state="closed"',
      top: 'side="top"',
      right: 'side="right"',
      bottom: 'side="bottom"',
      left: 'side="left"',
      disabled: 'disabled',
      highlighted: 'highlighted=""',
      selected: 'state="selected"'
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        app: {
          background: 'hsl(var(--app-background))',
          foreground: 'hsl(var(--app-foreground))',
          surface: {
            DEFAULT: 'hsl(var(--app-surface))',
            solid: 'hsl(var(--app-surface-solid))'
          }
          // surface: 'hsl(var(--app-surface))',
          // ['surface-solid']: 'hsl(var(--app-surface-solid))'
        },
        brand: {
          blue: {
            1: 'hsl(var(--brand-blue-1))',
            2: 'hsl(var(--brand-blue-2))',
            3: 'hsl(var(--brand-blue-3))',
            4: 'hsl(var(--brand-blue-4))',
            5: 'hsl(var(--brand-blue-5))',
            6: 'hsl(var(--brand-blue-6))',
            7: 'hsl(var(--brand-blue-7))',
            8: 'hsl(var(--brand-blue-8))',
            9: 'hsl(var(--brand-blue-9))',
            10: 'hsl(var(--brand-blue-10))',
            11: 'hsl(var(--brand-blue-11))',
            12: 'hsl(var(--brand-blue-12))'
          },
          gold: {
            1: 'hsl(var(--brand-gold-1))',
            2: 'hsl(var(--brand-gold-2))',
            3: 'hsl(var(--brand-gold-3))',
            4: 'hsl(var(--brand-gold-4))',
            5: 'hsl(var(--brand-gold-5))',
            6: 'hsl(var(--brand-gold-6))',
            7: 'hsl(var(--brand-gold-7))',
            8: 'hsl(var(--brand-gold-8))',
            9: 'hsl(var(--brand-gold-9))',
            10: 'hsl(var(--brand-gold-10))',
            11: 'hsl(var(--brand-gold-11))',
            12: 'hsl(var(--brand-gold-12))'
          },
          gray: {
            1: 'hsl(var(--brand-gray-1))',
            2: 'hsl(var(--brand-gray-2))',
            3: 'hsl(var(--brand-gray-3))',
            4: 'hsl(var(--brand-gray-4))',
            5: 'hsl(var(--brand-gray-5))',
            6: 'hsl(var(--brand-gray-6))',
            7: 'hsl(var(--brand-gray-7))',
            8: 'hsl(var(--brand-gray-8))',
            9: 'hsl(var(--brand-gray-9))',
            10: 'hsl(var(--brand-gray-10))',
            11: 'hsl(var(--brand-gray-11))',
            12: 'hsl(var(--brand-gray-12))'
          }
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          hover: 'hsl(var(--border-hover))'
        }
      },
      borderRadius: {
        none: '0px',
        xs: 'calc(var(--radius) - 4px)', // 2px
        sm: 'calc(var(--radius) - 2px)', // 4px
        DEFAULT: 'var(--radius)', // 6px
        md: 'calc(var(--radius) + 4px)', // 10px
        lg: 'calc(var(--radius) + 6px)', // 12px
        xl: 'calc(var(--radius) + 8px)' // 14px
      },
      boxShadow: {
        'navigation-divider': 'inset 0 -1px hsl(var(--border-hover))'
      },
      keyframes: {
        appear: {
          from: {opacity: '0', transform: 'translateY(16px)'},
          to: {opacity: '1', transform: 'translateY(0px)'}
        },
        'collapse-open': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-collapsible-content-height)'
          }
        },
        'collapse-close': {
          from: {
            height: 'var(--radix-collapsible-content-height)'
          },
          to: {
            height: '0'
          }
        },
        shimmer: {
          from: {transform: 'translateX(-100%)'},
          to: {transform: 'translateX(100%)'}
        }
      },
      animation: {
        appear: 'appear 750ms ease-in-out',
        'collapse-open': 'collapse-open 500ms ease-in-out',
        'collapse-close': 'collapse-close 300ms ease-in-out',
        shimmer: 'shimmer 1.25s infinite'
      }
    }
  },
  plugins: []
}

export default config
