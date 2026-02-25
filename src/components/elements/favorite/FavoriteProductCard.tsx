import { AddToCartButton, Button, FavoriteButton, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode, useTypedNavigation } from '@/hooks'
import { IProduct } from '@/types'
import { formatPrice, getFullImageUrl } from '@/utils'
import React, { useCallback } from 'react'
import { Image, View } from 'react-native'

export interface IFavoriteProductCardProps {
	product: IProduct
	onToggleFavorite: () => void
	isFavorite: boolean
}

export default function FavoriteProductCard({
	product,
	onToggleFavorite,
	isFavorite
}: IFavoriteProductCardProps) {
	const { navigate } = useTypedNavigation()
	const { themeColorKey } = useThemeMode()

	const handlePress = useCallback(() => {
		navigate('ProductInfo', { productId: product.id })
	}, [navigate, product.id])

	const handleAddToCart = useCallback(() => {
		console.log('Добавить в корзину:', product.name)
	}, [product.name])

	return (
		<Button
			onPress={handlePress}
			className='rounded-2xl overflow-hidden mr-2'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey],
				borderWidth: 1
			}}
		>
			<View className='relative'>
				<Image
					source={getFullImageUrl(product.image)}
					className='w-full aspect-square'
					resizeMode='cover'
				/>

				<FavoriteButton
					className='w-[32px] h-[32px] absolute top-2 right-2'
					isFavorite={isFavorite}
					onPress={onToggleFavorite}
				/>
			</View>

			<View className='flex-col gap-1.5 p-2.5'>
				<Text
					size='lg'
					weight='bold'
				>
					{product.name}
				</Text>

				<Text
					size='lg'
					weight='bold'
				>
					{formatPrice(product.price)}
				</Text>

				<AddToCartButton onPress={handleAddToCart} />
			</View>
		</Button>
	)
}
