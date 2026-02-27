import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { View } from 'react-native'
import { ToastType } from 'react-native-toast-message'
import Text from '../Text'

interface IToastProps {
	text?: string
	type: ToastType
}

export default function ToastItem({ text, type }: IToastProps) {
	const { themeColorKey } = useThemeMode()

	const backgroundColors = {
		success: COLORS.success[themeColorKey],
		error: COLORS.error[themeColorKey],
		info: COLORS.info[themeColorKey]
	} as const

	const backgroundColor = backgroundColors[type as 'success' | 'error' | 'info']

	return (
		<View
			className='rounded-2xl px-4 py-3 mx-4 shadow-black shadow-md'
			style={{
				backgroundColor
			}}
		>
			<Text
				weight='semibold'
				style={{
					color: COLORS.text.onPrimary[themeColorKey]
				}}
			>
				{text}
			</Text>
		</View>
	)
}
