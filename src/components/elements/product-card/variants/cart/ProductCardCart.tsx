import { ProductPrice, ProductQuantityControl } from '@/components/elements'
import { Button, FavoriteButton, Text } from '@/components/ui'
import { useCartQuantity } from '@/store'
import { getFullImageUrl } from '@/utils'
import cn from 'clsx'
import React, { useMemo } from 'react'
import { Image, View } from 'react-native'
import { IProductCardProps } from '../product-card.interface'

export interface IProductCardVariantProps {
	props: IProductCardProps
	className?: string
}

export default function ProductCardCart({
	props: { product, onCardPress },
	className
}: IProductCardVariantProps) {
	const quantity = useCartQuantity(product.id)
	const totalPrice = useMemo(
		() => (product?.price ?? 0) * (quantity || 1),
		[product?.price, quantity]
	)

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

				<ProductPrice price={totalPrice} />

				<View className='justify-end items-end'>
					<ProductQuantityControl
						className='px-0'
						product={product}
					/>
				</View>
			</View>

			<FavoriteButton
				className='absolute top-2 right-2'
				product={product}
			/>
		</Button>
	)
}
