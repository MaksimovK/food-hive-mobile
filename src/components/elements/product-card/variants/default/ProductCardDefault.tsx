import { AddToCartButton, Button, FavoriteButton, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { formatPrice, getFullImageUrl } from '@/utils'
import cn from 'clsx'
import React from 'react'
import { Image, View } from 'react-native'
import { IProductCardProps } from '../product-card.interface'

export interface IProductCardVariantProps {
	props: IProductCardProps
	className?: string
}

export default function ProductCardDefault({
	props: { product, onCardPress },
	className
}: IProductCardVariantProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<Button
			onPress={onCardPress}
			className={cn(`rounded-2xl overflow-hidden`, className)}
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
					product={product}
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

				<AddToCartButton onPress={() => console.log('cart')} />
			</View>
		</Button>
	)
}
