import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import React from 'react'
import { View, ViewProps } from 'react-native'

interface ISeparatorProps extends ViewProps {
	className?: string
}

export default function Separator({ className, ...props }: ISeparatorProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View
			{...props}
			className={cn(`border-b`, className)}
			style={{ borderColor: COLORS.border[themeColorKey] }}
		/>
	)
}
