import { axiosWithAuth } from '@/api/interceptor'
import { IProduct } from '@/types'

class FavoriteService {
	private BASE_URL = '/favorites'

	async findAll() {
		const response = await axiosWithAuth.get<IProduct[]>(`${this.BASE_URL}`)
		return response.data
	}

	async toggle(productId: Pick<IProduct, 'id'>) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/toggle`, {
			productId: productId.id
		})
		return response.data
	}

	async bulkAdd(productIds: Pick<IProduct, 'id'>[]) {
		const ids = productIds.map(p => p.id)
		const response = await axiosWithAuth.post(`${this.BASE_URL}/bulk/add`, {
			productIds: ids
		})
		return response.data
	}

	async bulkRemove(productIds: Pick<IProduct, 'id'>[]) {
		const ids = productIds.map(p => p.id)
		const response = await axiosWithAuth.post(`${this.BASE_URL}/bulk/remove`, {
			productIds: ids
		})
		return response.data
	}

	async clear() {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/clear`)
		return response.data
	}
}

export const favoriteService = new FavoriteService()
