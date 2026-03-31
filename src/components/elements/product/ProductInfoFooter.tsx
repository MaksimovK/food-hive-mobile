import { AddToCartButton, Title } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { ICartProduct, IProduct } from '@/types'
import { formatPrice } from '@/utils'
import React from 'react'
import { View } from 'react-native'

interface ProductInfoFooterProps {
	product: IProduct
	totalPrice: number
}

export default function ProductInfoFooter({
	product,
	totalPrice
}: ProductInfoFooterProps) {
	const { themeColorKey } = useThemeMode()

	const cartProduct: ICartProduct = {
		id: product.id,
		name: product.name,
		image: product.image,
		price: product.price,
		unit: product.unit,
		servingSize: product.servingSize,
		quantity: 1,
		itemTotal: totalPrice
	}

	return (
		<View
			className='absolute bottom-0 left-0 right-0 px-4 py-5 rounded-t-2xl border-t border-x'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey]
			}}
		>
			<View className='flex-row items-center gap-3'>
				<View className='flex-1'>
					<Title title={formatPrice(totalPrice)} />
				</View>

				<AddToCartButton product={cartProduct} />
			</View>
		</View>
	)
}
