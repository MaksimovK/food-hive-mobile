import ProfileScreen from '@/components/screens/profile/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type ProfileStackParamList = {
	Profile: undefined
}

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export default function ProfileStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
			/>
		</Stack.Navigator>
	)
}
