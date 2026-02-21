import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

interface IInitialState {
	theme: ThemeMode
	isDark: boolean
}

interface IActions {
	setTheme: (theme: ThemeMode) => void
	toggleTheme: () => void
}

type ThemeStateType = IInitialState & IActions

const initialState: IInitialState = {
	theme: 'light',
	isDark: false
}

const themeStore: StateCreator<ThemeStateType> = (set, get) => ({
	...initialState,

	setTheme: theme => {
		set({
			theme,
			isDark: theme === 'dark'
		})
	},
	toggleTheme: () => {
		const newTheme = get().theme === 'light' ? 'dark' : 'light'
		set({
			theme: newTheme,
			isDark: newTheme === 'dark'
		})
	}
})

export const useThemeStore = create<ThemeStateType>()(
	persist(themeStore, {
		name: 'theme-storage',
		storage: createJSONStorage(() => AsyncStorage),
		partialize: state => ({ theme: state.theme, isDark: state.isDark })
	})
)

export const useTheme = () => useThemeStore(state => state.theme)
export const useIsDark = () => useThemeStore(state => state.isDark)
export const useToggleTheme = () => useThemeStore(state => state.toggleTheme)
export const useSetTheme = () => useThemeStore(state => state.setTheme)
