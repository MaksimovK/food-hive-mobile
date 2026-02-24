import { COLORS } from '@/constants/colors.constant'
import { useThemeMode } from '@/hooks/useThemeMode'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
	const { isDark } = useThemeMode()
	const themeColorKey = isDark ? 'dark' : 'light'

	return (
		<ActivityIndicator
			color={COLORS.primary[themeColorKey]}
			style={{ backgroundColor: COLORS.background[themeColorKey], flex: 1 }}
		/>
	)
}
