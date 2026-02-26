import { useTypedNavigation } from '@/hooks'
import { IProduct } from '@/types'
import React, { ComponentType } from 'react'
import { ViewProps } from 'react-native'
import { IViewElement } from '../element.types'
import ProductCardDefault from './variants/default/ProductCardDefault'
import ProductCardHorizontal from './variants/horizontal/ProductCardHorizontal'
import {
	IProductCardProps,
	TypeProductCardVariant
} from './variants/product-card.interface'

type TypeProductCardProps = IProductCardProps & {
	container?: ViewProps
	onPress?: () => void
}

const ProductCard = ({
	variant = 'default',
	product,
	onPress,
	container,
	...props
}: TypeProductCardProps) => {
	const { navigate } = useTypedNavigation()

	if (!product) return null

	const handleOpenProductDetail = () =>
		navigate('ProductInfo', { productId: product.id })

	const variants: Record<
		TypeProductCardVariant,
		ComponentType<IViewElement<IProductCardProps>>
	> = {
		default: ProductCardDefault,
		horizontal: ProductCardHorizontal
	}

	const TypedProductCard = variants[variant]

	const cardProps: IProductCardProps = {
		variant: variant as TypeProductCardVariant,
		product: product as IProduct,
		onCardPress: onPress ?? handleOpenProductDetail
	}

	return (
		<TypedProductCard
			props={cardProps}
			{...container}
			{...props}
		/>
	)
}

export default React.memo(ProductCard)
