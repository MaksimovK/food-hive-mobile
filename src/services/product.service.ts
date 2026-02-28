import { axiosClassic } from '@/api/interceptor'
import { IProduct, IProductDetails, ISearchProductsParams } from '@/types'

class ProductService {
	private BASE_URL = '/products'

	async getProductById(id: string) {
		const response = await axiosClassic.get<IProductDetails>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async searchProducts(params: ISearchProductsParams) {
		const { query, limit = 6, offset = 0 } = params
		const response = await axiosClassic.get<IProduct[]>(
			`${this.BASE_URL}/search`,
			{
				params: {
					q: query,
					limit,
					offset
				}
			}
		)
		return response.data
	}
}

export const productService = new ProductService()
