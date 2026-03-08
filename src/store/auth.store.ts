import { UserResponse } from '@/types'
import EncryptedStorage from 'react-native-encrypted-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useCartStore } from './cart.store'
import { useFavoritesStore } from './favorites.store'

interface IInitialState {
	user: UserResponse | null
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
}

interface IActions {
	setAuth: (data: Omit<IInitialState, 'isAuthenticated'>) => void
	logout: () => void
	updateUser: (user: Partial<UserResponse>) => void
}

export type AuthStateType = IInitialState & IActions

const initialState: IInitialState = {
	user: null,
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false
}

const authStore: StateCreator<AuthStateType> = (set, get) => ({
	...initialState,

	setAuth: async data => {
		set({
			user: data.user,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
			isAuthenticated: true
		})

		const { syncWithServer: syncFavorites } = useFavoritesStore.getState()
		const { syncWithServer: syncCart } = useCartStore.getState()

		await Promise.all([syncFavorites(), syncCart()])
	},

	logout: () => {
		set({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false
		})

		const { setSynced: setFavoritesSynced } = useFavoritesStore.getState()
		const { setSynced: setCartSynced } = useCartStore.getState()

		setFavoritesSynced(false)
		setCartSynced(false)
	},

	updateUser: user => {
		const currentUser = get().user
		if (currentUser) {
			set({
				user: { ...currentUser, ...user }
			})
		}
	}
})

export const useAuthStore = create<AuthStateType>()(
	persist(authStore, {
		name: 'auth-storage',
		storage: createJSONStorage(() => EncryptedStorage),
		partialize: state => ({
			user: state.user,
			accessToken: state.accessToken,
			refreshToken: state.refreshToken,
			isAuthenticated: state.isAuthenticated
		})
	})
)

export const useUser = () => useAuthStore(state => state.user)
export const useAccessToken = () => useAuthStore(state => state.accessToken)
export const useRefreshToken = () => useAuthStore(state => state.refreshToken)
export const useIsAuthenticated = () =>
	useAuthStore(state => state.isAuthenticated)
export const useSetAuth = () => useAuthStore(state => state.setAuth)
export const useLogout = () => useAuthStore(state => state.logout)
export const useUpdateUser = () => useAuthStore(state => state.updateUser)
