/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Grey Cliff', 'sans-serif'],
      },
      colors: {
        principal: {
          0: '#6B7280', //Simple text
          50: '#111827', //Title text
          100: '#EEE3FF', //Primary character select
          150: '#8054C7', //Primary text in buttons
          200: '#63D838', //Secondary actions
          250: '#F3F4F6', //Search background
          300: '#5A3696', //Primary buttons
          350: '#2563EB', //Result Filter Text
          400: '#3B8520' //Filter count text
        },
      },
    },
  },
  plugins: [],
}

