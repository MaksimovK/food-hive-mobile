import HomeScreen from '@/components/screens/home/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type HomeStackParamList = {
	Home: undefined
}

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
			/>
		</Stack.Navigator>
	)
}
