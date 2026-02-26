import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IBackButtonProps extends IIconButtonProps {
	backgroundColor?: string
}

export default function BackButton({
	icon = ArrowLeft,
	backgroundColor,
	onPress,
	className,
	...props
}: IBackButtonProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<IconButton
			{...props}
			className={cn(`w-[36px] h-[36px]`, className)}
			style={{
				backgroundColor:
					backgroundColor || COLORS.surfaceElevated[themeColorKey],
				...props.style
			}}
			icon={icon}
			iconColor={COLORS.text.primary[themeColorKey]}
			onPress={onPress}
		/>
	)
}
