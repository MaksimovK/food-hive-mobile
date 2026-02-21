const { COLORS } = require('./src/constants/colors.constant')

module.exports = {
	content: [
		'./App.tsx',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/styles/global.css'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				...COLORS
			}
		}
	},
	plugins: []
}
