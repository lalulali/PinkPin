/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ED0577',
        status: {
          submitted: '#3B82F6',
          waiting: '#F59E0B',
          closed: '#10B981',
          cancelled: '#EF4444',
        },
      },
    },
  },
  plugins: [],
}
