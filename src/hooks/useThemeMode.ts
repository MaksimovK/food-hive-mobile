import {
	ThemeStateType,
	useIsDark,
	useSetTheme,
	useTheme,
	useToggleTheme
} from '@/store/theme.store'

export interface UseThemeModeReturn extends ThemeStateType {
	themeColorKey: 'dark' | 'light'
}

export function useThemeMode(): UseThemeModeReturn {
	const theme = useTheme()
	const isDark = useIsDark()
	const toggleTheme = useToggleTheme()
	const setTheme = useSetTheme()
	const themeColorKey = isDark ? 'dark' : 'light'

	return {
		theme,
		isDark,
		toggleTheme,
		setTheme,
		themeColorKey
	}
}
