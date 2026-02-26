import { IconButton } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { useIsFavorite, useToggleFavorite } from '@/store'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IFavoriteButtonProps extends IIconButtonProps {
	iconSize?: number
	product: IProduct
}

export default function FavoriteButton({
	icon = Heart,
	iconSize,
	className,
	product,
	...props
}: IFavoriteButtonProps) {
	const toggleFavorite = useToggleFavorite()
	const isFavorite = useIsFavorite(product.id)
	const { themeColorKey } = useThemeMode()

	const handleToggleFavorite = useCallback(() => {
		toggleFavorite(product)
	}, [product, toggleFavorite])

	const size = iconSize || (isFavorite ? 24 : DEFAULT_ICON_SIZE)

	return (
		<IconButton
			{...props}
			className={className}
			icon={icon}
			style={{
				backgroundColor: COLORS.surfaceElevated[themeColorKey],
				...props.style
			}}
			iconColor={isFavorite ? 'none' : COLORS.text.primary[themeColorKey]}
			iconFill={isFavorite ? COLORS.primary[themeColorKey] : 'none'}
			strokeWidth={2}
			size={size}
			onPress={handleToggleFavorite}
		/>
	)
}
