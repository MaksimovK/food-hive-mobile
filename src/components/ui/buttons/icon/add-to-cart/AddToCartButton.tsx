import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { ShoppingCart } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IAddToCartButtonProps extends IIconButtonProps {}

export default function AddToCartButton({
	icon = ShoppingCart,
	onPress,
	className,
	...props
}: IAddToCartButtonProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<IconButton
			{...props}
			className={cn(`rounded-xl py-1.5`, className)}
			icon={icon}
			text='В корзину'
			style={{
				backgroundColor: COLORS.primary[themeColorKey],
				...props.style
			}}
			iconColor={COLORS.text.primary[themeColorKey]}
			onPress={onPress}
		/>
	)
}
