import { useThemeMode } from '@/hooks'
import type { PropsWithChildren } from 'react'
import { memo, useMemo } from 'react'
import { View } from 'react-native'

function ThemeProviderComponent({ children }: PropsWithChildren) {
	useThemeMode()

	return useMemo(() => <View className='flex-1'>{children}</View>, [children])
}

export const ThemeProvider = memo(ThemeProviderComponent)
