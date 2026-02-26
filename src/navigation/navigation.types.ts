import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { ComponentType } from 'react'

export type TypeTabStackParamList = {
	HomeScreen: undefined
	FavoriteScreen: undefined
	CartScreen: undefined
	ProfileScreen: undefined
	ProductInfo: { productId: string }
}

export interface IRoute {
	name: keyof TypeTabStackParamList
	component: ComponentType
	options?: NativeStackNavigationOptions
}

export type TypeRootStackParamList = {
	HomeStack: undefined
	SearchStack: undefined
	FavoriteStack: undefined
	CartStack: undefined
	ProfileStack: undefined
}
