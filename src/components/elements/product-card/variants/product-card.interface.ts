import { IProduct } from '@/types'

export type TypeProductCardVariant = 'default' | 'horizontal'

export interface IProductCardProps {
	variant?: TypeProductCardVariant
	product: IProduct
	onCardPress?: () => void
}
