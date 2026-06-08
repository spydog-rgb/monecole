/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        jade:  { light: '#FBEAF0', mid: '#D4537E', dark: '#72243E' },
        hugo:  { light: '#E1F5EE', mid: '#1D9E75', dark: '#085041' },
        brand: { light: '#EEEDFE', mid: '#534AB7', dark: '#3C3489' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
