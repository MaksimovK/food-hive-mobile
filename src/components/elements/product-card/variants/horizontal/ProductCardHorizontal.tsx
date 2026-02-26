import ProductPrice from '@/components/elements/products-by-category/ProductPrice'
import { Button, FavoriteButton, Text } from '@/components/ui'
import { formatPrice, getFullImageUrl } from '@/utils'
import cn from 'clsx'
import React from 'react'
import { Image, View } from 'react-native'
import { IProductCardProps } from '../product-card.interface'

export interface IProductCardVariantProps {
	props: IProductCardProps
	className?: string
}

export default function ProductCardHorizontal({
	props: { product, onCardPress },
	className
}: IProductCardVariantProps) {
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

			<View className='flex-1 p-3'>
				<Text
					size='lg'
					weight='medium'
					className='mb-2'
					numberOfLines={2}
				>
					{product.name}
				</Text>

				<ProductPrice price={formatPrice(product.price)} />
			</View>

			<FavoriteButton
				className='absolute top-2 right-2'
				product={product}
			/>
		</Button>
	)
}
