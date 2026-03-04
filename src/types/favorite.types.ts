import { IBase } from './root.types'

export interface IFavoriteProduct extends IBase {
	name: string
	image: string
	price: number
	isActive: boolean
}
