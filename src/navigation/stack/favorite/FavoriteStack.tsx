import FavoriteScreen from '@/components/screens/favorite/Favorite'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

export type FavoriteStackParamList = {
	Favorite: undefined
}

const Stack = createNativeStackNavigator<FavoriteStackParamList>()

export default function FavoriteStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='Favorite'
				component={FavoriteScreen}
			/>
		</Stack.Navigator>
	)
}
