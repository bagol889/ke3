/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Jaga-jaga kalau pakai folder src
  ],
  theme: {
    extend: {
      // Bagian ini MEMPERBAIKI error "Syntax error: @apply w-18"
      spacing: {
        '18': '4.5rem', // 72px
      },
      // Menambahkan palet warna agar tampilan dashboard lebih profesional
      colors: {
        background: '#0f172a', // Slate 900 (Gelap Modern)
        surface: '#1e293b',    // Slate 800
        primary: '#3b82f6',    // Blue 500
        accent: '#8b5cf6',     // Violet 500
      }
    },
  },
  plugins: [],
}