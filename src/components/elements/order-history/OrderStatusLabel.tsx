import { Text } from '@/components/ui'
import { getStatusColors, statusLabels } from '@/constants'
import { useThemeMode } from '@/hooks'
import { EnumOrderStatus } from '@/types'
import React from 'react'
import { View } from 'react-native'

export interface IOrderStatusLabelProps {
	status: EnumOrderStatus
	size?: 'sm' | 'base' | 'lg'
	className?: string
}

export default function OrderStatusLabel({
	status,
	size = 'sm',
	className
}: IOrderStatusLabelProps) {
	const { themeColorKey } = useThemeMode()
	const colors = getStatusColors(status, themeColorKey)

	return (
		<View
			className={`px-3 py-1.5 rounded-2xl border ${className || ''}`}
			style={{
				backgroundColor: colors.background,
				borderColor: colors.border
			}}
		>
			<Text
				size={size}
				weight='medium'
				style={{ color: colors.text }}
			>
				{statusLabels[status]}
			</Text>
		</View>
	)
}
