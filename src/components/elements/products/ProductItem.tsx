import Text from '@/components/ui/Text'
import { IProduct } from '@/types/product.types'
import { formatPrice } from '@/utils/formatPrice'
import { getFullImageUrl } from '@/utils/image.util'
import React from 'react'
import { Image, Pressable, PressableProps, View } from 'react-native'
import ProductPrice from './ProductPrice'

export interface ProductItemProps extends Omit<PressableProps, 'onPress'> {
	product: IProduct
}

export default function ProductItem({ product, ...props }: ProductItemProps) {
	return (
		<Pressable
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
		</Pressable>
	)
}
