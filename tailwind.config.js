/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 东方禅意色彩系统
        paper: {
          50: '#FDFCFB',
          100: '#F7F5F0',
          200: '#F4F1EA', // 主宣纸色
          300: '#E8E4DA',
          400: '#D9D4C9',
        },
        ink: {
          primary: '#1F1F1F', // 主墨色
          secondary: '#575757', // 淡墨
          tertiary: '#A8A29E', // 极淡墨
          light: '#D4D4D4', // 浅灰
        },
        seal: {
          red: '#B91C1C', // 印章红
          light: '#DC2626',
          dark: '#991B1B',
        }
      },
      fontFamily: {
        calligraphy: ['"Ma Shan Zheng"', 'cursive'],
        serif: ['"Noto Serif SC"', 'Songti SC', 'serif'],
        sans: ['"Noto Sans SC"', 'PingFang SC', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'ink-wash': "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.03) 100%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'ink-spread': 'inkSpread 1.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        inkSpread: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
