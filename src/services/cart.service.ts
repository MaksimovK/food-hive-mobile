import { axiosWithAuth } from '@/api/interceptor'
import { ICartItemInput, ICartResponse } from '@/types'

class CartService {
	private BASE_URL = '/cart'

	async getCart() {
		const response = await axiosWithAuth.get<ICartResponse>(`${this.BASE_URL}`)
		return response.data
	}

	async addToCart(item: ICartItemInput) {
		const response = await axiosWithAuth.post<ICartResponse>(
			`${this.BASE_URL}/add`,
			item
		)
		return response.data
	}

	async removeFromCart(item: ICartItemInput) {
		const response = await axiosWithAuth.post<ICartResponse>(
			`${this.BASE_URL}/remove`,
			item
		)
		return response.data
	}

	async bulkAdd(items: ICartItemInput[]) {
		const response = await axiosWithAuth.post<ICartResponse>(
			`${this.BASE_URL}/bulk/add`,
			{ items }
		)
		return response.data
	}

	async bulkRemove(items: ICartItemInput[]) {
		const response = await axiosWithAuth.post<ICartResponse>(
			`${this.BASE_URL}/bulk/remove`,
			{ items }
		)
		return response.data
	}

	async clear() {
		const response = await axiosWithAuth.delete<{ message: string }>(
			`${this.BASE_URL}/clear`
		)
		return response.data
	}
}

export const cartService = new CartService()
