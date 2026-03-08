import { IconButton } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { Moon, Sun } from 'lucide-react-native'
import React from 'react'
import { IIconButtonProps } from '../icon-button.interface'

export interface IThemeButtonProps extends IIconButtonProps {}

export default function ThemeButton({
	icon,
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
			className={cn(`w-12 h-12`, className)}
			style={{
				...props.style
			}}
			icon={icon}
			size={30}
			iconColor={COLORS.text.primary[themeColorKey]}
			onPress={toggleTheme}
		/>
	)
}
