import { ViewProps } from 'react-native'

export interface IViewElement<T> extends ViewProps {
	props: T
	isLoading?: boolean
}
