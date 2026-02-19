module.exports = {
	content: [
		'./App.tsx',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/styles/global.css'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {}
	},
	plugins: []
}
