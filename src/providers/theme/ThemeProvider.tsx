import { useThemeMode } from '@/hooks'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { View, useColorScheme } from 'react-native'

export default function ThemeProvider({
	children
}: PropsWithChildren<unknown>) {
	const { theme, setTheme } = useThemeMode()
	const systemColorScheme = useColorScheme()

	useEffect(() => {
		if (theme === 'system') {
			setTheme(systemColorScheme === 'dark' ? 'dark' : 'light')
		}
	}, [systemColorScheme, theme, setTheme])

	return <View style={{ flex: 1 }}>{children}</View>
}
