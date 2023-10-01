import type { Config } from 'tailwindcss';

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
        'text-white': 'var(--color-text-white)',
        'gray-medium': 'var(--color-gray-medium)',
        'gray-dark': 'var(--color-gray-dark)',
        'purple-medium-bg': 'var(--color-purple-medium-bg)',
        'purple-light-bg': 'var(--color-purple-light-bg)',
        'purple-dark': 'var(--color-purple-dark)',
        'purple-medium': 'var(--color-purple-medium)',
      },
    },
  },
  plugins: [],
};
export default config;
