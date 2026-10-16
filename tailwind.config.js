/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#05060A',
          surface: '#0B0D14',
          elevated: '#111420',
        },
        ink: {
          light: '#F1F2F6',
          muted: '#8A90A2',
          faint: '#4A5064',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          glow: 'rgba(139, 92, 246, 0.35)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          glow: 'rgba(34, 211, 238, 0.35)',
        },
        mint: {
          DEFAULT: '#34F5C5',
          dim: 'rgba(52, 245, 197, 0.15)',
        },
        coral: {
          DEFAULT: '#FB7185',
        },
        hairline: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-quant': 'linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)',
        'gradient-quant-v': 'linear-gradient(180deg, #8B5CF6 0%, #22D3EE 100%)',
        'gradient-quant-subtle': 'linear-gradient(90deg, rgba(139,92,246,0.12) 0%, rgba(34,211,238,0.12) 100%)',
      },
      boxShadow: {
        'quant-glow': '0 0 35px -5px rgba(139, 92, 246, 0.3), 0 0 15px -3px rgba(34, 211, 238, 0.2)',
        'cyan-glow': '0 0 25px -4px rgba(34, 211, 238, 0.35)',
        'mint-glow': '0 0 15px 0 rgba(52, 245, 197, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spin 35s linear infinite reverse',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
