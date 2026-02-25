import { BackButton, FavoriteButton } from '@/components/ui'
import { useIsFavorite, useToggleFavorite } from '@/store'
import { IProduct } from '@/types'
import { getFullImageUrl } from '@/utils'
import React, { useCallback } from 'react'
import { Image, View } from 'react-native'

export interface IProductImageProps {
	product: IProduct
	imageUrl: string
	onGoBack: () => void
}

export default function ProductImage({
	product,
	imageUrl,
	onGoBack
}: IProductImageProps) {
	const toggleFavorite = useToggleFavorite()
	const isFav = useIsFavorite(product.id)

	const handleToggleFavorite = useCallback(() => {
		toggleFavorite(product)
	}, [toggleFavorite, product])

	return (
		<View className='relative'>
			<View className='w-full h-80'>
				<Image
					source={getFullImageUrl(imageUrl)}
					className='w-full h-full rounded-2xl'
					resizeMode='cover'
				/>
			</View>

			<BackButton
				className='absolute top-4 left-4'
				onPress={onGoBack}
			/>

			<FavoriteButton
				className='w-12 h-12 absolute top-4 right-4'
				isFavorite={isFav}
				onPress={handleToggleFavorite}
			/>
		</View>
	)
}
