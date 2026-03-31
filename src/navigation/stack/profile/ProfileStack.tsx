import About from '@/components/screens/about/About'
import Address from '@/components/screens/address/Address'
import OrderDetails from '@/components/screens/order-details/OrderDetails'
import OrderHistory from '@/components/screens/order-history/OrderHistory'
import Profile from '@/components/screens/profile/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type ProfileStackParamList = {
	Profile: undefined
	OrderHistory: undefined
	OrderDetails: { orderId: string }
	Address: undefined
	About: undefined
}

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export default function ProfileStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Profile'
				component={Profile}
			/>
			<Stack.Screen
				name='OrderHistory'
				component={OrderHistory}
			/>
			<Stack.Screen
				name='OrderDetails'
				component={OrderDetails}
			/>
			<Stack.Screen
				name='Address'
				component={Address}
			/>
			<Stack.Screen
				name='About'
				component={About}
			/>
		</Stack.Navigator>
	)
}
