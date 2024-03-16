import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      primary: '#E86C00',
      secondary: '#2E5AAC',
      tertiary: '#EEF2FA',
      background: '#F4F6F9',
      error: '#DA1414',
      errorLight: '#FEEFEF',
      input: '#09101D',
      inputFocus: '#B25300',
      placeholder: '#858C94',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
export default config
