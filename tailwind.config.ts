import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'violet': '#904E75',
        'strongblue': '#4A9194',
        'darkblue': '#2F4858',
        'greenblue': '#CFFBE2',
        'greenpitch' : '#007533',
        'ligthyellow' : '#FFEB3B79',
        'yellow' : '#FFEB3B',
        'ligthgreen' : '#D7FADB'
      },
    },
  },
  plugins: [],
}
export default config
