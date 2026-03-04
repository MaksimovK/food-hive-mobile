import { EnumUnit } from './product.types'
import { IBase } from './root.types'

export interface ICartItemInput {
	productId: string
	quantity: number
}

export interface ICartProduct extends IBase {
	name: string
	image: string
	price: number
	unit: EnumUnit
	servingSize: number
	quantity: number
	itemTotal: number
}

export interface ICartResponse {
	items: ICartProduct[]
	totalProducts: number
	totalPrice: number
}
