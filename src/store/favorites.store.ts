import { favoriteService } from '@/services'
import { IProduct } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IInitialState {
	favorites: IProduct[]
	isSynced: boolean
}

interface IActions {
	isFavorite: (productId: string) => boolean
	toggleFavorite: (product: IProduct) => void
	clearFavorites: () => void
	setFavorites: (favorites: IProduct[]) => void
	syncWithServer: () => Promise<void>
	setSynced: (synced: boolean) => void
}

export type FavoritesStateType = IInitialState & IActions

const initialState: IInitialState = {
	favorites: [],
	isSynced: false
}

const favoriteUtils = {
	add: (favorites: IProduct[], product: IProduct) =>
		favorites.some(p => p.id === product.id)
			? favorites
			: [...favorites, product],

	remove: (favorites: IProduct[], productId: string) =>
		favorites.filter(p => p.id !== productId),

	toggle: (favorites: IProduct[], product: IProduct) => {
		const exists = favorites.some(p => p.id === product.id)
		return exists
			? favoriteUtils.remove(favorites, product.id)
			: favoriteUtils.add(favorites, product)
	}
}

const favoritesStore: StateCreator<FavoritesStateType> = (set, get) => ({
	...initialState,

	isFavorite: productId => get().favorites.some(p => p.id === productId),

	setFavorites: favorites => set({ favorites }),

	setSynced: synced => set({ isSynced: synced }),

	toggleFavorite: async product => {
		const { favorites, isSynced } = get()

		const newFavorites = favoriteUtils.toggle(favorites, product)
		set({ favorites: newFavorites })

		if (!isSynced) return

		try {
			await favoriteService.toggle({ id: product.id })
		} catch (error) {
			console.error('Failed to toggle favorite on server:', error)
			set({ favorites })
		}
	},

	clearFavorites: async () => {
		const { isSynced } = get()

		set({ favorites: [] })

		if (!isSynced) return

		try {
			await favoriteService.clear()
		} catch (error) {
			console.error('Failed to clear favorites on server:', error)
		}
	},

	syncWithServer: async () => {
		const { favorites: localFavorites } = get()

		try {
			const serverFavorites = await favoriteService.findAll()

			if (localFavorites.length === 0) {
				set({ favorites: serverFavorites, isSynced: true })
				return
			}

			const localIds = new Set(localFavorites.map(p => p.id))
			const serverIds = new Set(serverFavorites.map(p => p.id))

			const toAdd = localFavorites.filter(p => !serverIds.has(p.id))
			const toMerge = serverFavorites.filter(p => !localIds.has(p.id))

			if (toAdd.length > 0) {
				await favoriteService.bulkAdd(toAdd.map(p => ({ id: p.id })))
			}

			const merged = [...localFavorites, ...toMerge]
			const uniqueIds = new Set<string>()
			const uniqueFavorites = merged.filter(p => {
				if (uniqueIds.has(p.id)) return false
				uniqueIds.add(p.id)
				return true
			})

			set({ favorites: uniqueFavorites, isSynced: true })
		} catch (error) {
			console.error('Failed to sync favorites with server:', error)
			set({
				isSynced: true
			})
		}
	}
})

export const useFavoritesStore = create<FavoritesStateType>()(
	persist(favoritesStore, {
		name: 'favorites-storage',
		storage: createJSONStorage(() => AsyncStorage),
		partialize: state => ({
			favorites: state.favorites,
			isSynced: state.isSynced
		})
	})
)

export const useFavorites = () => useFavoritesStore(state => state.favorites)
export const useIsFavorite = (productId: string) =>
	useFavoritesStore(state => state.favorites.some(p => p.id === productId))
export const useToggleFavorite = () =>
	useFavoritesStore(state => state.toggleFavorite)
export const useClearFavorites = () =>
	useFavoritesStore(state => state.clearFavorites)
export const useSetFavorites = () =>
	useFavoritesStore(state => state.setFavorites)
export const useSyncWithServer = () =>
	useFavoritesStore(state => state.syncWithServer)
export const useSetSynced = () => useFavoritesStore(state => state.setSynced)
export const useIsSynced = () => useFavoritesStore(state => state.isSynced)
