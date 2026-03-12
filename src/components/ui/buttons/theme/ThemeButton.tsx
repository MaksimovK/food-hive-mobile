import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { Moon, Sun } from 'lucide-react-native'
import React from 'react'
import Text from '../../Text'
import Button from '../Button'
import { IButtonProps } from '../button.interface'

export default function ThemeButton({ onPress }: IButtonProps) {
	const { themeColorKey, isDark } = useThemeMode()

	return (
		<Button
			className='flex-row items-center p-4 gap-2 rounded-2xl'
			style={{
				backgroundColor: COLORS.surface[themeColorKey]
			}}
			onPress={onPress}
		>
			<Text size='sm'>Сменить тему</Text>
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
