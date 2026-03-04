import { ICartProduct, IProduct } from '@/types'

export type TypeProductCardVariant = 'default' | 'horizontal'

export interface IProductCardProps {
	variant?: TypeProductCardVariant
	product: IProduct | ICartProduct
	onCardPress?: () => void
	showQuantityControl?: boolean
}
