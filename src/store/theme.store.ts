import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'

interface IInitialState {
	theme: ThemeMode
}

interface IActions {
	setTheme: (theme: ThemeMode) => void
	toggleTheme: () => void
}

export type ThemeStateType = IInitialState & IActions

const initialState: IInitialState = {
	theme: 'light'
}

const themeStore: StateCreator<ThemeStateType> = (set, get) => ({
	...initialState,

	setTheme: theme => {
		set({ theme })
	},
	toggleTheme: () => {
		const newTheme = get().theme === 'light' ? 'dark' : 'light'
		set({
			theme: newTheme
		})
	}
})

export const useThemeStore = create<ThemeStateType>()(
	persist(themeStore, {
		name: 'theme-storage',
		storage: createJSONStorage(() => AsyncStorage),
		partialize: state => ({ theme: state.theme })
	})
)

export const useTheme = () => useThemeStore(state => state.theme)
export const useToggleTheme = () => useThemeStore(state => state.toggleTheme)
export const useSetTheme = () => useThemeStore(state => state.setTheme)
export const useThemeState = () => {
	const theme = useThemeStore(state => state.theme)
	const toggleTheme = useThemeStore(state => state.toggleTheme)
	const setTheme = useThemeStore(state => state.setTheme)

	return { theme, toggleTheme, setTheme }
}
