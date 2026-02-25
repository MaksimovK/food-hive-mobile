import { Button, FavoriteButton, Text } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { useIsFavorite, useToggleFavorite } from '@/store'
import { IProduct } from '@/types'
import { formatPrice, getFullImageUrl } from '@/utils'
import React, { useCallback } from 'react'
import { Image, PressableProps, View } from 'react-native'
import ProductPrice from './ProductPrice'

export interface IProductItemProps extends Omit<PressableProps, 'onPress'> {
	product: IProduct
}

export default function ProductItem({ product, ...props }: IProductItemProps) {
	const { navigate } = useTypedNavigation()
	const toggleFavorite = useToggleFavorite()
	const isFav = useIsFavorite(product.id)

	const handlePress = useCallback(() => {
		navigate('ProductInfo', { productId: product.id })
	}, [navigate, product.id])

	const handleToggleFavorite = useCallback(() => {
		toggleFavorite(product)
	}, [toggleFavorite, product])

	return (
		<Button
			onPress={handlePress}
			className='flex-row items-center rounded-2xl overflow-hidden'
			{...props}
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
				isFavorite={isFav}
				onPress={handleToggleFavorite}
			/>
		</Button>
	)
}
