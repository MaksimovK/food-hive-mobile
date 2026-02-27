import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { ActivityIndicator } from 'react-native'

interface ILoaderProps {
	isLoaderButton?: boolean
}

export default function Loader({ isLoaderButton }: ILoaderProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<ActivityIndicator
			color={
				isLoaderButton
					? COLORS.background[themeColorKey]
					: COLORS.primary[themeColorKey]
			}
			style={
				isLoaderButton
					? { backgroundColor: 'transparent' }
					: { backgroundColor: COLORS.background[themeColorKey], flex: 1 }
			}
		/>
	)
}
