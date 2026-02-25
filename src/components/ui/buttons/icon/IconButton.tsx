import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React from 'react'
import { View } from 'react-native'
import Text from '../../Text'
import Button from '../Button'
import { IIconButtonProps } from './icon-button.interface'

export default function IconButton({
	className,
	icon,
	text,
	size = DEFAULT_ICON_SIZE,
	iconColor,
	iconFill = 'none',
	strokeWidth,
	...rest
}: IIconButtonProps) {
	const { themeColorKey } = useThemeMode()

	const IconComponent = icon

	return (
		<Button
			{...rest}
			className={cn(
				`${!text && 'w-8 h-8'}
				rounded-full items-center justify-center`,
				className
			)}
		>
			<View className='items-center justify-center flex-row'>
				{IconComponent && (
					<IconComponent
						size={size}
						color={iconColor || COLORS.text.primary[themeColorKey]}
						fill={iconFill}
						strokeWidth={strokeWidth}
					/>
				)}
				{text && (
					<Text
						size='base'
						weight='medium'
						className='pl-2'
					>
						{text}
					</Text>
				)}
			</View>
		</Button>
	)
}
