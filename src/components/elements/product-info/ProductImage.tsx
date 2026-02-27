import { BackButton, FavoriteButton } from '@/components/ui'
import { IProduct } from '@/types'
import { getFullImageUrl } from '@/utils'
import React from 'react'
import { Image, View } from 'react-native'

export interface IProductImageProps {
	product: IProduct
	imageUrl: string
}

export default function ProductImage({
	product,
	imageUrl
}: IProductImageProps) {
	return (
		<View className='relative'>
			<View className='w-full h-80'>
				<Image
					source={getFullImageUrl(imageUrl)}
					className='w-full h-full rounded-2xl'
					resizeMode='cover'
				/>
			</View>

			<BackButton className='absolute top-4 left-4' />

			<FavoriteButton
				className='w-[36px] h-[36px] absolute top-4 right-4'
				product={product}
			/>
		</View>
	)
}
