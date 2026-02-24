import HomeScreen from '@/components/screens/home/Home'
import ProductInfo from '@/components/screens/product-info/ProductInfo'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type HomeStackParamList = {
	Home: undefined
	ProductInfo: { productId: string }
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
			/>
			<Stack.Screen
				name='ProductInfo'
				component={ProductInfo}
			/>
		</Stack.Navigator>
	)
}
