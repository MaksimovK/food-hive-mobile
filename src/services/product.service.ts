import { axiosClassic } from '@/api/interceptor'
import { IProductDetails } from '@/types'

class ProductService {
	private BASE_URL = '/products'

	async getProductById(id: string) {
		const response = await axiosClassic.get<IProductDetails>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}
}

export const productService = new ProductService()
