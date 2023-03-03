/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			Agora: ["Agora", "serif"],
		},
		extend: {
			backgroundImage: {
				"background-image": "url('/src/components/assets/background.png')",
			},
		},
	},
	plugins: [],
};
