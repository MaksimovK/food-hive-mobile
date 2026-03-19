import { IconButton } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { ArrowUp } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export default function UpButton({
	onPress,
	...props
}: Omit<IIconButtonProps, 'icon'>) {
	const { themeColorKey } = useThemeMode()

	return (
		<IconButton
			{...props}
			icon={ArrowUp}
			size={DEFAULT_ICON_SIZE}
			style={{
				backgroundColor: COLORS.primary[themeColorKey],
				...props.style
			}}
			iconColor={COLORS.text.onPrimary[themeColorKey]}
			onPress={onPress}
		/>
	)
}
