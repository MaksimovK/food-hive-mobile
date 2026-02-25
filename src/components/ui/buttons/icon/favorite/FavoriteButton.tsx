import { IconButton } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { Heart } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IFavoriteButtonProps extends IIconButtonProps {
	isFavorite?: boolean
	iconSize?: number
}

export default function FavoriteButton({
	icon = Heart,
	isFavorite = false,
	iconSize,
	onPress,
	className,
	...props
}: IFavoriteButtonProps) {
	const { themeColorKey } = useThemeMode()

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
			onPress={onPress}
		/>
	)
}
