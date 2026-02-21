import { useIsDark } from '@/store/theme.store'
import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

export default function ThemeProvider({
	children
}: PropsWithChildren<unknown>) {
	const isDark = useIsDark()

	return (
		<View
			className={isDark ? 'dark' : ''}
			style={{ flex: 1 }}
		>
			{children}
		</View>
	)
}
