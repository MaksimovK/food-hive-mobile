import {
	ProductQuantityControl,
	ProductServingInfo
} from '@/components/elements'
import { Button, FavoriteButton, Text } from '@/components/ui'
import { useCartItemTotal } from '@/store'
import { ICartProduct, IFavoriteProduct } from '@/types'
import { getFullImageUrl } from '@/utils'
import cn from 'clsx'
import React from 'react'
import { Image, View } from 'react-native'
import { IProductCardProps } from '../product-card.interface'

export interface IProductCardVariantProps {
	props: IProductCardProps
	className?: string
}

export default function ProductCardHorizontal({
	props,
	className
}: IProductCardVariantProps) {
	const { product, onCardPress, showQuantityControl } = props
	const totalPrice = useCartItemTotal(product.id)

	return (
		<Button
			onPress={onCardPress}
			className={cn(
				`flex-row items-center rounded-2xl overflow-hidden`,
				className
			)}
		>
			<View className='w-1/3 aspect-square'>
				<Image
					source={getFullImageUrl(product.image)}
					className='w-full h-full rounded-2xl'
					resizeMode='cover'
				/>
			</View>

			<View className='flex-1 px-3'>
				<Text
					size='lg'
					weight='medium'
					className='mb-2'
					numberOfLines={2}
				>
					{product.name}
				</Text>

				<ProductServingInfo
					price={
						showQuantityControl ? totalPrice || product.price : product.price
					}
					servingSize={product.servingSize}
					unit={product.unit}
				/>

				{showQuantityControl && (
					<View className='justify-end items-end'>
						<ProductQuantityControl
							className='px-0'
							product={product as ICartProduct}
						/>
					</View>
				)}
			</View>

			<FavoriteButton
				className='absolute top-2 right-2'
				product={product as IFavoriteProduct}
			/>
		</Button>
	)
}
