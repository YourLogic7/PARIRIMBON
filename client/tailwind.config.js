/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paririmbon: {
          leather: '#2b1810',
          'leather-dark': '#1a0d07',
          'leather-light': '#3d2317',
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          'gold-dark': '#997a15',
          parchment: '#fcf8eb',
          'parchment-dark': '#f4ebd0',
          'parchment-border': '#e2d4b7',
          ink: '#231f20',
          'ink-muted': '#5c544e',
          ruby: '#8b1e1e',
          emerald: '#1b4d3e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 15px rgba(0, 0, 0, 0.2)',
        'book-spine': 'inset 15px 0 25px -10px rgba(0, 0, 0, 0.4), inset -15px 0 25px -10px rgba(0, 0, 0, 0.4)',
        'page-left': 'inset -12px 0 15px -8px rgba(0, 0, 0, 0.15)',
        'page-right': 'inset 12px 0 15px -8px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
