const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
      },
      colors: {
				'todo-black': '#69665c',
				'todo-light-bg': '#b2afa1',
				'todo-yellow': '#fff9de',
			}
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
		require("tailwindcss-animate"),
  ],
}

