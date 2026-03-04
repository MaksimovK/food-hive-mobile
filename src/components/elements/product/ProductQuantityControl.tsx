import { IconButton, Text } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { useAddToCart, useCartQuantity, useRemoveFromCart } from '@/store'
import { ICartProduct } from '@/types'
import cn from 'clsx'
import { Minus, Plus, Trash2 } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View, ViewProps } from 'react-native'

export interface IProductQuantityControlProps extends ViewProps {
	product: ICartProduct
	className?: string
}

export default function ProductQuantityControl({
	product,
	className,
	...props
}: IProductQuantityControlProps) {
	const { themeColorKey } = useThemeMode()
	const quantity = useCartQuantity(product.id)
	const addToCart = useAddToCart()
	const removeFromCart = useRemoveFromCart()

	const handleIncrement = useCallback(() => {
		addToCart(product, 1)
	}, [product, addToCart])

	const handleDecrement = useCallback(() => {
		if (quantity === 1) {
			removeFromCart(product.id)
		} else {
			removeFromCart(product.id, 1)
		}
	}, [product.id, quantity, removeFromCart])

	const isInCart = quantity > 0

	if (!isInCart) {
		return null
	}

	return (
		<View
			{...props}
			className={cn(
				`flex-row items-center gap-2 justify-center rounded-full py-[4.5px] px-4`,
				className
			)}
			style={{
				backgroundColor: COLORS.background[themeColorKey]
			}}
		>
			<IconButton
				icon={quantity === 1 ? Trash2 : Minus}
				size={DEFAULT_ICON_SIZE}
				style={{
					backgroundColor: COLORS.surfaceElevated[themeColorKey]
				}}
				iconColor={
					quantity === 1
						? COLORS.error[themeColorKey]
						: COLORS.text.primary[themeColorKey]
				}
				onPress={handleDecrement}
			/>

			<Text
				size='lg'
				weight='bold'
				className='px-4 text-center'
				align='center'
			>
				{quantity}
			</Text>

			<IconButton
				icon={Plus}
				size={DEFAULT_ICON_SIZE}
				style={{
					backgroundColor: COLORS.surfaceElevated[themeColorKey]
				}}
				iconColor={COLORS.text.primary[themeColorKey]}
				onPress={handleIncrement}
			/>
		</View>
	)
}
