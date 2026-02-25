import { IProduct } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IInitialState {
	favorites: IProduct[]
}

interface IActions {
	addToFavorites: (product: IProduct) => void
	removeFromFavorites: (productId: string) => void
	isFavorite: (productId: string) => boolean
	toggleFavorite: (product: IProduct) => void
	clearFavorites: () => void
}

export type FavoritesStateType = IInitialState & IActions

const initialState: IInitialState = {
	favorites: []
}

const favoritesStore: StateCreator<FavoritesStateType> = (set, get) => ({
	...initialState,

	addToFavorites: product => {
		const favorites = get().favorites
		const exists = favorites.some(p => p.id === product.id)
		if (!exists) {
			set({ favorites: [...favorites, product] })
		}
	},

	removeFromFavorites: productId => {
		set({
			favorites: get().favorites.filter(p => p.id !== productId)
		})
	},

	isFavorite: productId => {
		return get().favorites.some(p => p.id === productId)
	},

	toggleFavorite: product => {
		const favorites = get().favorites
		const exists = favorites.some(p => p.id === product.id)
		if (exists) {
			set({ favorites: favorites.filter(p => p.id !== product.id) })
		} else {
			set({ favorites: [...favorites, product] })
		}
	},

	clearFavorites: () => {
		set({ favorites: [] })
	}
})

export const useFavoritesStore = create<FavoritesStateType>()(
	persist(favoritesStore, {
		name: 'favorites-storage',
		storage: createJSONStorage(() => AsyncStorage),
		partialize: state => ({ favorites: state.favorites })
	})
)

export const useFavorites = () => useFavoritesStore(state => state.favorites)
export const useAddToFavorites = () =>
	useFavoritesStore(state => state.addToFavorites)
export const useRemoveFromFavorites = () =>
	useFavoritesStore(state => state.removeFromFavorites)
export const useIsFavorite = (productId: string) =>
	useFavoritesStore(state => state.favorites.some(p => p.id === productId))
export const useToggleFavorite = () =>
	useFavoritesStore(state => state.toggleFavorite)
export const useClearFavorites = () =>
	useFavoritesStore(state => state.clearFavorites)
