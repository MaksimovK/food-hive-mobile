import { IProduct } from './product.types'

export interface ICartItemInput {
	productId: string
	quantity: number
}

export interface ICartItem extends IProduct {
	quantity: number
	itemTotal: number
}

export interface ICartResponse {
	items: ICartItem[]
	totalProducts: number
	totalPrice: number
}
