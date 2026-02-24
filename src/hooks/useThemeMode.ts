import {
	ThemeStateType,
	useIsDark,
	useSetTheme,
	useTheme,
	useToggleTheme
} from '@/store/theme.store'

export function useThemeMode(): ThemeStateType {
	const theme = useTheme()
	const isDark = useIsDark()
	const toggleTheme = useToggleTheme()
	const setTheme = useSetTheme()

	return {
		theme,
		isDark,
		toggleTheme,
		setTheme
	}
}
