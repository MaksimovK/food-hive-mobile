import ProductInfo from '@/components/screens/product-info/ProductInfo.tsx'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { TypeRootStackParamList } from './navigation.types.ts'
import { TabNavigator } from './tab/TabNavigation.tsx'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='MainTabs'
					component={TabNavigator}
				/>
				<Stack.Screen
					name='ProductInfo'
					component={ProductInfo}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
