import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

export interface IFloatingButtonProps extends TouchableOpacityProps {
	icon: React.ComponentType<{ size: number; color: string }>
	size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
	sm: { button: 48, icon: 24 },
	md: { button: 56, icon: 28 },
	lg: { button: 64, icon: 32 }
}

export default function FloatingButton({
	icon: Icon,
	size = 'md',
	className,
	style,
	...props
}: IFloatingButtonProps) {
	const { themeColorKey } = useThemeMode()
	const dimensions = SIZE_MAP[size]

	return (
		<View
			className={cn(
				`absolute bottom-6 right-1/2 left-1/2 transform -translate-x-1/2`,
				className
			)}
			style={style}
		>
			<TouchableOpacity
				className='items-center justify-center rounded-full shadow-lg'
				style={{
					width: dimensions.button,
					height: dimensions.button,
					backgroundColor: COLORS.primary[themeColorKey],
					shadowColor: COLORS.primary[themeColorKey],
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.3,
					shadowRadius: 8,
					elevation: 8
				}}
				activeOpacity={0.8}
				{...props}
			>
				<Icon
					size={dimensions.icon}
					color={COLORS.text.onPrimary[themeColorKey]}
				/>
			</TouchableOpacity>
		</View>
	)
}
