import { axiosClassic } from '@/api/interceptor'
import { IProduct, IProductDetails } from '@/types'

class ProductService {
	private BASE_URL = '/products'

	async getProductById(id: string) {
		const response = await axiosClassic.get<IProductDetails>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async searchProducts(query: string) {
		const response = await axiosClassic.get<IProduct[]>(
			`${this.BASE_URL}/search?q=${query}`
		)
		return response.data
	}
}

export const productService = new ProductService()
