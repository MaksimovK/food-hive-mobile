import CartScreen from '@/components/screens/cart/Cart'
import OrderScreen from '@/components/screens/order/Order'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type CartStackParamList = {
	Cart: undefined
	Order: undefined
}

const Stack = createNativeStackNavigator<CartStackParamList>()

export default function CartStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Cart'
				component={CartScreen}
			/>
			<Stack.Screen
				name='Order'
				component={OrderScreen}
			/>
		</Stack.Navigator>
	)
}
