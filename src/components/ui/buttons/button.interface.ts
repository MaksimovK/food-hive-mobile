import { ReactNode } from 'react'
import { ActivityIndicatorProps, PressableProps } from 'react-native'

export type ButtonStateType = 'default' | 'disable'

export interface IButtonProps extends Omit<PressableProps, 'children'> {
	isLoading?: boolean
	loaderProps?: ActivityIndicatorProps
	state?: ButtonStateType
	className?: string
	children?: ReactNode
}
