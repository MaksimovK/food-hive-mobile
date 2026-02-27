import { ToastItem } from '@/components/ui'
import { ToastConfig } from 'react-native-toast-message'

export const toastConfig: ToastConfig = {
	success: props => (
		<ToastItem
			{...props}
			text={props.text1}
		/>
	),
	error: props => (
		<ToastItem
			{...props}
			text={props.text1}
		/>
	),
	info: props => (
		<ToastItem
			{...props}
			text={props.text1}
		/>
	)
}
