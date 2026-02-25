import FavoriteScreen from '@/components/screens/favorite/Favorite'
import ProductInfo from '@/components/screens/product-info/ProductInfo'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type FavoriteStackParamList = {
	Favorite: undefined
	ProductInfo: { productId: string }
}

const Stack = createNativeStackNavigator<FavoriteStackParamList>()

export default function FavoriteStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Favorite'
				component={FavoriteScreen}
			/>
			<Stack.Screen
				name='ProductInfo'
				component={ProductInfo}
			/>
		</Stack.Navigator>
	)
}
