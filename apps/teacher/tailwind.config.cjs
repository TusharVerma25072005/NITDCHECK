/** @type {import('tailwindcss').Config} */
const config = require('@repo/tailwind/tailwindConfig');

module.exports = {
  ...config,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}'
  ],
}
