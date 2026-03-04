import { ProductQuantityControl } from '@/components/elements'
import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { useAddToCart, useIsInCart } from '@/store'
import { ICartProduct } from '@/types'
import cn from 'clsx'
import { ShoppingCart } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IAddToCartButtonProps extends IIconButtonProps {
	product: ICartProduct
}

export default function AddToCartButton({
	icon = ShoppingCart,
	className,
	product,
	...props
}: IAddToCartButtonProps) {
	const addToCart = useAddToCart()
	const isInCart = useIsInCart(product.id)
	const { themeColorKey } = useThemeMode()

	const handleAddToCart = useCallback(() => {
		addToCart(product, 1)
	}, [addToCart, product])

	if (isInCart) {
		return <ProductQuantityControl product={product} />
	}

	return (
		<IconButton
			{...props}
			className={cn(`px-4 py-2`, className)}
			icon={icon}
			text='В корзину'
			style={{
				backgroundColor: COLORS.primary[themeColorKey],
				...props.style
			}}
			iconColor={COLORS.text.primary[themeColorKey]}
			onPress={handleAddToCart}
		/>
	)
}
