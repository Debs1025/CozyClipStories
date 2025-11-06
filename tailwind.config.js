/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8f0f1b',
          primaryDark: '#6f0b15',
          beige: '#e9dfd3',
          sand: '#efe7dc',
          border: '#c9bfb3',
          card: '#f6f2ec',
          ink: '#2a2a2a',
          muted: '#6b6b6b',
          button: '#164e63'
        },
      },
      boxShadow: {
        card: '0 1px 1px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.06)'
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
        display: ['"Palatino Linotype"', 'Palatino', 'serif']
      }
    },
  },
  plugins: [],
}
