import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

interface IContainerProps extends PropsWithChildren {
	className?: string
}

export default function Container({
	children,
	className,
	...props
}: IContainerProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View
			{...props}
			className={cn(`rounded-2xl p-4`, className)}
			style={{ backgroundColor: COLORS.surfaceElevated[themeColorKey] }}
		>
			{children}
		</View>
	)
}
