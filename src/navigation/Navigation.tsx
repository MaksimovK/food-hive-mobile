import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { TabNavigator } from './tab/TabNavigation.tsx'

export default function Navigation() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	)
}
