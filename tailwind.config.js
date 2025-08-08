/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // В Tailwind v4 darkMode работает по-другому
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    extend: {
      colors: {
        // Кастомные цвета для темной темы
        'dark-bg': '#111827',
        'dark-surface': '#1f2937',
        'dark-border': '#374151',
        'dark-text': '#f9fafb',
        'light-bg': '#ffffff',
        'light-surface': '#f9fafb',
        'light-border': '#e5e7eb',
        'light-text': '#1f2937',
      }
    },
  },
  plugins: [
    // Плагин для темной темы в v4
    function({ addVariant }) {
      addVariant('dark', '.dark &')
    }
  ],
} 

