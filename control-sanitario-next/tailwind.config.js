/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Breakpoints personalizados para tablets
      screens: {
        'xs': '480px',      // móviles grandes
        'sm': '640px',      // tablets pequeñas (vertical)
        'md': '768px',      // tablets estándar (vertical)
        'tablet': '834px',  // tablets comunes como iPad
        'lg': '1024px',     // tablets grandes (horizontal) / laptops
        'xl': '1280px',     // desktop
        '2xl': '1536px',    // desktop grande
        // Breakpoints personalizados para orientación
        'tablet-portrait': {'raw': '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)'},
        'tablet-landscape': {'raw': '(min-width: 768px) and (max-width: 1366px) and (orientation: landscape)'},
      },
      // Colores personalizados
      colors: {
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-color-hover)',
        secondary: 'var(--secondary-color)',
        'secondary-hover': 'var(--secondary-color-hover)',
        accent: 'var(--accent-color)',
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        warning: 'var(--warning-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-on-primary': 'var(--text-on-primary)',
        'background-light': 'var(--background-light)',
        'background-dark': 'var(--background-dark)',
        // Colores extendidos para notificaciones con soporte para modo oscuro
        toast: {
          success: {
            bg: '#f0fdf4',
            'bg-dark': '#14532d',
            border: '#4ade80',
            'border-dark': '#16a34a',
            text: '#166534',
            'text-dark': '#dcfce7',
            icon: '#22c55e',
            'icon-dark': '#4ade80',
          },
          error: {
            bg: '#fef2f2',
            'bg-dark': '#7f1d1d',
            border: '#f87171',
            'border-dark': '#dc2626',
            text: '#991b1b',
            'text-dark': '#fecaca',
            icon: '#ef4444',
            'icon-dark': '#f87171',
          },
          info: {
            bg: '#eff6ff',
            'bg-dark': '#1e3a8a',
            border: '#60a5fa',
            'border-dark': '#2563eb',
            text: '#1e40af',
            'text-dark': '#dbeafe',
            icon: '#3b82f6',
            'icon-dark': '#60a5fa',
          },
          warning: {
            bg: '#fefce8',
            'bg-dark': '#713f12',
            border: '#facc15',
            'border-dark': '#ca8a04',
            text: '#854d0e',
            'text-dark': '#fef9c3',
            icon: '#eab308',
            'icon-dark': '#facc15',
          },
        },
      },
      // Animaciones personalizadas para notificaciones
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9) translateX(100%)', opacity: '0' },
          '50%': { transform: 'scale(1.02) translateX(-5px)' },
          '100%': { transform: 'scale(1) translateX(0)', opacity: '1' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        progressBar: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-out-right': 'fadeOutRight 0.3s ease-in',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'subtle-pulse': 'subtlePulse 1s ease-in-out infinite',
        'progress': 'progressBar 5s linear',
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
        serif: ['var(--font-family-serif)'],
      },
      fontSize: {
        // Tamaños legacy (mantener por compatibilidad)
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        
        // Tamaños responsivos con clamp() - NUEVOS
        'responsive-h1': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1' }],
        'responsive-h2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'responsive-h3': ['clamp(1.25rem, 2.5vw, 1.875rem)', { lineHeight: '1.2' }],
        'responsive-h4': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'responsive-h5': ['clamp(1rem, 1.5vw, 1.25rem)', { lineHeight: '1.3' }],
        'responsive-h6': ['clamp(0.9375rem, 1.5vw, 1.125rem)', { lineHeight: '1.4' }],
        'responsive-body': ['clamp(0.875rem, 1.5vw, 1.0625rem)', { lineHeight: '1.6' }],
        'responsive-lead': ['clamp(1rem, 1.75vw, 1.25rem)', { lineHeight: '1.6' }],
        'responsive-small': ['clamp(0.75rem, 1.2vw, 0.875rem)', { lineHeight: '1.4' }],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.2',
        normal: '1.4',
        relaxed: '1.6',
        loose: '1.8',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      spacing: {
        'toast': '1rem',
      },
      zIndex: {
        'toast': '9999',
      },
    },
  },
  plugins: [],
};