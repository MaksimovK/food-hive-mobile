import About from '@/components/screens/about/About'
import Address from '@/components/screens/address/Address'
import OrderHistory from '@/components/screens/order-history/OrderHistory'
import Profile from '@/components/screens/profile/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type ProfileStackParamList = {
	Profile: undefined
	OrderHistory: undefined
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
