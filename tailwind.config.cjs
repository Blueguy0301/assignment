/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"blue-30": "#00235B",
				"red-30": "#E21818",
				"yellow-30": "#FFDD83",
				"blue-10": "#98DFD6",
			},
		},
	},
	plugins: [],
}
