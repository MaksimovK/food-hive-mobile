import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { ActivityIndicator } from 'react-native'

interface ILoaderProps {
	isLoaderButton?: boolean
}

export default function Loader({ isLoaderButton }: ILoaderProps) {
	const { themeColorKey } = useThemeMode()

	const loaderColor = isLoaderButton
		? COLORS.background[themeColorKey]
		: COLORS.primary[themeColorKey]

	const backgroundColor = isLoaderButton
		? 'transparent'
		: COLORS.background[themeColorKey]

	const flex = isLoaderButton ? undefined : 1

	return (
		<ActivityIndicator
			color={loaderColor}
			style={{ backgroundColor, flex }}
		/>
	)
}
