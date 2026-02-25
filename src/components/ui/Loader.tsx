import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
	const { themeColorKey } = useThemeMode()

	return (
		<ActivityIndicator
			color={COLORS.primary[themeColorKey]}
			style={{ backgroundColor: COLORS.background[themeColorKey], flex: 1 }}
		/>
	)
}
