module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      // Colores extendidos para notificaciones con soporte para modo oscuro
      colors: {
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
      // Espaciado y tamaños específicos para toasts
      spacing: {
        'toast': '1rem',
      },
      // Z-index para asegurar que los toasts aparezcan sobre otros elementos
      zIndex: {
        'toast': '9999',
      },
    },
  },
  plugins: [],
}
