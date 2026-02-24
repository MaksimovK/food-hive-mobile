import Navigation from '@/navigation/Navigation'
import Providers from '@/providers/Providers'
import React from 'react'
import './src/styles/global.css'

export default function App() {
	return (
		<Providers>
			<Navigation />
		</Providers>
	)
}
