import { DEFAULT_TOAST_VISIBLE_TIME } from '@/constants'
import Toast from 'react-native-toast-message'
import { IToastProps } from './toast.interface'

export const toastShow = ({
	type,
	text,
	position = 'bottom',
	autoHide = true,
	visibilityTime = DEFAULT_TOAST_VISIBLE_TIME
}: IToastProps) => {
	Toast.show({
		type,
		text1: text,
		position,
		autoHide,
		visibilityTime
	})
}

export const toastSuccess = (text: string) =>
	toastShow({ type: 'success', text: text })

export const toastError = (text: string) => toastShow({ type: 'error', text })

export const toastInfo = (text: string) => toastShow({ type: 'info', text })
