import { ThemeStateType, useThemeState } from '@/store/theme.store'
import { useCallback, useMemo } from 'react'
import { useColorScheme } from 'react-native'

export interface UseThemeModeReturn extends Omit<ThemeStateType, 'isDark'> {
	isDark: boolean
	themeColorKey: 'dark' | 'light'
}

export function useThemeMode(): UseThemeModeReturn {
	const { theme, toggleTheme, setTheme } = useThemeState()
	const systemColorScheme = useColorScheme()

	const isDark =
		theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark'
	const themeColorKey = isDark ? 'dark' : 'light'

	const stableToggleTheme = useCallback(toggleTheme, [toggleTheme])
	const stableSetTheme = useCallback(setTheme, [setTheme])

	return useMemo(
		() => ({
			theme,
			isDark,
			toggleTheme: stableToggleTheme,
			setTheme: stableSetTheme,
			themeColorKey
		}),
		[theme, isDark, themeColorKey, stableToggleTheme, stableSetTheme]
	)
}
