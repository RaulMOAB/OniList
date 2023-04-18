/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		animation: {
			"fade-in-down": "fade-in-down 0.5s ease-out",
		},
		keyframes: {
			"fade-in-down": {
				"0%": {
					opacity: "0",
					transform: "translateY(-10px)",
				},
				"100%": {
					opacity: "1",
					transform: "translateY(0)",
				},
			}
		},
	},
	// add daisyUI plugin
	plugins: [require("daisyui")],

	// daisyUI config (optional)
	daisyui: {
		styled: true,
		themes: false,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "light",
	},
};
