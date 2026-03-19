import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import cn from 'clsx'
import { Moon, Sun } from 'lucide-react-native'
import React from 'react'
import Text from '../../Text'
import Button from '../Button'
import { IButtonProps } from '../button.interface'

interface IThemeButtonProps extends IButtonProps {
	className?: string
}

export default function ThemeButton({ onPress, className }: IThemeButtonProps) {
	const { themeColorKey, isDark } = useThemeMode()

	return (
		<Button
			className={cn(
				`flex-row items-center justify-center p-4 gap-2 rounded-2xl`,
				className
			)}
			style={{
				backgroundColor: COLORS.surface[themeColorKey]
			}}
			onPress={onPress}
		>
			<Text weight='semibold'>Сменить тему</Text>
			{isDark ? (
				<Moon
					size={30}
					color={COLORS.text.primary[themeColorKey]}
				/>
			) : (
				<Sun
					size={30}
					color={COLORS.text.primary[themeColorKey]}
				/>
			)}
		</Button>
	)
}
