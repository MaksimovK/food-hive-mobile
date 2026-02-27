import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { Moon, Sun } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IThemeButtonProps extends IIconButtonProps {
	backgroundColor?: string
}

export default function ThemeButton({
	icon,
	backgroundColor,
	className,
	...props
}: IThemeButtonProps) {
	const { themeColorKey, toggleTheme } = useThemeMode()

	if (themeColorKey === 'light') {
		icon = Sun
	} else {
		icon = Moon
	}

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
			onPress={toggleTheme}
		/>
	)
}
