import { Text } from '@/components/ui'
import { ICheckoutCartItem } from '@/types'
import { formatPrice, getFullImageUrl } from '@/utils'
import React from 'react'
import { Image, View } from 'react-native'

export interface IProductElementProps {
	product: ICheckoutCartItem
}

export default function ProductElement({
	product: item
}: IProductElementProps) {
	return (
		<View className='flex-row items-center gap-3 py-2'>
			<Image
				source={getFullImageUrl(item.image)}
				className='w-16 h-16 rounded-xl'
				resizeMode='cover'
			/>

			<View className='flex-1'>
				<Text
					weight='medium'
					numberOfLines={2}
				>
					{item.name}
				</Text>
			</View>

			<View className='items-end gap-1'>
				<Text weight='medium'>
					{item.quantity} x {formatPrice(item.price)}
				</Text>

				<Text size='sm'>{formatPrice(item.itemTotal)}</Text>
			</View>
		</View>
	)
}
