import { ActivityIndicatorProps, PressableProps } from 'react-native'

export interface IButtonProps extends PressableProps {
	isLoading?: boolean
	loaderProps?: ActivityIndicatorProps
	state?: ButtonStateType
	className?: string
}

export type ButtonStateType = 'default' | 'disable'
