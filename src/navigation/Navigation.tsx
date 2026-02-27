import Auth from '@/components/screens/auth/Auth'
import ProductInfo from '@/components/screens/product-info/ProductInfo'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { TypeRootStackParamList } from './navigation.types'
import { TabNavigator } from './tab/TabNavigation'

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
				<Stack.Screen
					name='Auth'
					component={Auth}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
