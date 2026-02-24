import { IProduct } from '../product.types'

export interface IProductsByCategory {
	categoryId: string
	categoryName: string
	products: IProduct[]
}
