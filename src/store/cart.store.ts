import { cartService } from '@/services'
import { ICartProduct, ICartResponse } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IInitialState {
	items: ICartProduct[]
	totalProducts: number
	totalPrice: number
	isSynced: boolean
}

interface IActions {
	isInCart: (productId: string) => boolean
	getQuantity: (productId: string) => number
	addToCart: (product: ICartProduct, quantity?: number) => Promise<void>
	removeFromCart: (productId: string, quantity?: number) => Promise<void>
	clearCart: () => Promise<void>
	setCart: (cart: ICartResponse) => void
	syncWithServer: () => Promise<void>
	setSynced: (synced: boolean) => void
}

export type CartStateType = IInitialState & IActions

const initialState: IInitialState = {
	items: [],
	totalProducts: 0,
	totalPrice: 0,
	isSynced: false
}

const cartUtils = {
	add: (items: ICartProduct[], product: ICartProduct, quantity: number) => {
		const existingIndex = items.findIndex(p => p.id === product.id)
		if (existingIndex > -1) {
			const newItems = [...items]
			const newQuantity = newItems[existingIndex].quantity + quantity
			newItems[existingIndex] = {
				...newItems[existingIndex],
				quantity: newQuantity,
				itemTotal: newItems[existingIndex].price * newQuantity
			}
			return newItems
		}
		return [
			...items,
			{ ...product, quantity, itemTotal: product.price * quantity }
		]
	},

	remove: (items: ICartProduct[], productId: string, quantity?: number) => {
		const existing = items.find(p => p.id === productId)
		if (!existing) return items

		if (!quantity || existing.quantity <= quantity) {
			return items.filter(p => p.id !== productId)
		}
		return items.map(p =>
			p.id === productId
				? {
						...p,
						quantity: p.quantity - quantity,
						itemTotal: p.price * (p.quantity - quantity)
				  }
				: p
		)
	},

	calculateTotals: (items: ICartProduct[]) => ({
		totalProducts: items.reduce((sum, item) => sum + item.quantity, 0),
		totalPrice: items.reduce((sum, item) => sum + item.itemTotal, 0)
	})
}

const cartStore: StateCreator<CartStateType> = (set, get) => ({
	...initialState,

	isInCart: productId => get().items.some(p => p.id === productId),

	getQuantity: productId => {
		const item = get().items.find(p => p.id === productId)
		return item?.quantity || 0
	},

	setCart: cart => {
		set({
			items: cart.items,
			totalProducts: cart.totalProducts,
			totalPrice: cart.totalPrice
		})
	},

	setSynced: synced => set({ isSynced: synced }),

	addToCart: async (product, quantity = 1) => {
		const { items, isSynced } = get()

		const newItems = cartUtils.add(items, product, quantity)
		const totals = cartUtils.calculateTotals(newItems)

		set({
			items: newItems,
			...totals
		})

		if (!isSynced) return

		try {
			await cartService.addToCart({ productId: product.id, quantity })
		} catch (error) {
			console.error('Failed to add to cart on server:', error)
			set({ items, ...cartUtils.calculateTotals(items) })
		}
	},

	removeFromCart: async (productId, quantity) => {
		const { items, isSynced } = get()
		const existing = items.find(p => p.id === productId)

		if (!existing) return

		const newItems = cartUtils.remove(items, productId, quantity)
		const totals = cartUtils.calculateTotals(newItems)

		set({
			items: newItems,
			...totals
		})

		if (!isSynced) return

		try {
			await cartService.removeFromCart({
				productId,
				quantity: quantity || existing.quantity
			})
		} catch (error) {
			console.error('Failed to remove from cart on server:', error)
			set({ items, ...cartUtils.calculateTotals(items) })
		}
	},

	clearCart: async () => {
		const { isSynced } = get()

		set({
			items: [],
			totalProducts: 0,
			totalPrice: 0
		})

		if (!isSynced) return

		try {
			await cartService.clear()
		} catch (error) {
			console.error('Failed to clear cart on server:', error)
		}
	},

	syncWithServer: async () => {
		const { items: localItems } = get()

		try {
			const serverCart = await cartService.getCart()

			if (localItems.length === 0) {
				set({
					items: serverCart.items,
					totalProducts: serverCart.totalProducts,
					totalPrice: serverCart.totalPrice,
					isSynced: true
				})
				return
			}

			const serverIds = new Set(serverCart.items.map(p => p.id))

			// Товары, которые есть только локально — добавляем на сервер
			const toAdd = localItems
				.filter(p => !serverIds.has(p.id))
				.map(p => ({ productId: p.id, quantity: p.quantity }))

			// Товары, которые есть и локально, и на сервере — берём максимальное количество
			// Если локально больше — обновляем сервер
			const toUpdate = localItems
				.filter(p => serverIds.has(p.id))
				.map(localItem => {
					const serverItem = serverCart.items.find(s => s.id === localItem.id)
					if (!serverItem) return null

					if (localItem.quantity > serverItem.quantity) {
						return {
							productId: localItem.id,
							quantity: localItem.quantity - serverItem.quantity
						}
					}
					return null
				})
				.filter(Boolean) as { productId: string; quantity: number }[]

			if (toAdd.length > 0) {
				await cartService.bulkAdd(toAdd)
			}

			if (toUpdate.length > 0) {
				await Promise.all(
					toUpdate.map(item =>
						cartService.addToCart({
							productId: item.productId,
							quantity: item.quantity
						})
					)
				)
			}

			const updatedCart = await cartService.getCart()

			set({
				items: updatedCart.items,
				totalProducts: updatedCart.totalProducts,
				totalPrice: updatedCart.totalPrice,
				isSynced: true
			})
		} catch (error) {
			console.error('Failed to sync cart with server:', error)
			set({
				isSynced: true
			})
		}
	}
})

export const useCartStore = create<CartStateType>()(
	persist(cartStore, {
		name: 'cart-storage',
		storage: createJSONStorage(() => AsyncStorage),
		partialize: state => ({
			items: state.items,
			totalProducts: state.totalProducts,
			totalPrice: state.totalPrice,
			isSynced: state.isSynced
		})
	})
)

export const useCartItems = () => useCartStore(state => state.items)
export const useCartTotalProducts = () =>
	useCartStore(state => state.totalProducts)
export const useCartTotalPrice = () => useCartStore(state => state.totalPrice)
export const useIsInCart = (productId: string) =>
	useCartStore(state => state.items.some(p => p.id === productId))
export const useCartQuantity = (productId: string) =>
	useCartStore(
		state => state.items.find(p => p.id === productId)?.quantity || 0
	)
export const useCartItemTotal = (productId: string) =>
	useCartStore(state => state.items.find(p => p.id === productId)?.itemTotal)
export const useAddToCart = () => useCartStore(state => state.addToCart)
export const useRemoveFromCart = () =>
	useCartStore(state => state.removeFromCart)
export const useClearCart = () => useCartStore(state => state.clearCart)
export const useSetCart = () => useCartStore(state => state.setCart)
export const useSyncWithServer = () =>
	useCartStore(state => state.syncWithServer)
export const useSetSynced = () => useCartStore(state => state.setSynced)
export const useIsSynced = () => useCartStore(state => state.isSynced)
