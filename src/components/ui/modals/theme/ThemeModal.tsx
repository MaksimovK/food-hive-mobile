import { Button, Modal, Text } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { ThemeMode } from '@/store'
import cn from 'clsx'
import { Check, Laptop, Moon, Sun } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { IModalProps } from '../Modal'

type ThemeOption = {
	value: ThemeMode
	label: string
	icon: React.ComponentType<{ size: number; color: string }>
}

const themeOptions: ThemeOption[] = [
	{
		value: 'light',
		label: 'Светлая',
		icon: Sun
	},
	{
		value: 'dark',
		label: 'Тёмная',
		icon: Moon
	},
	{
		value: 'system',
		label: 'Системная',
		icon: Laptop
	}
]

export default function ThemeModal({ visible, onClose }: IModalProps) {
	const { theme, setTheme, themeColorKey } = useThemeMode()

	const handleThemeSelect = useCallback(
		(newTheme: ThemeMode) => {
			setTheme(newTheme)
			onClose()
		},
		[setTheme, onClose]
	)

	return (
		<Modal
			visible={visible}
			onClose={onClose}
			title='Выберите тему'
		>
			<View className='p-4 gap-3'>
				{themeOptions.map(option => {
					const isSelected = theme === option.value
					const Icon = option.icon

					return (
						<Button
							key={option.value}
							className={cn(
								'flex-row items-center justify-between p-4 rounded-2xl border-2',
								isSelected && 'border-primary'
							)}
							style={{
								backgroundColor: COLORS.surface[themeColorKey],
								borderColor: isSelected
									? COLORS.primary[themeColorKey]
									: COLORS.border[themeColorKey]
							}}
							onPress={() => handleThemeSelect(option.value)}
						>
							<View className='flex-row items-center gap-4'>
								<Icon
									size={DEFAULT_ICON_SIZE}
									color={COLORS.text.primary[themeColorKey]}
								/>
								<Text
									size='lg'
									weight={isSelected ? 'semibold' : 'medium'}
								>
									{option.label}
								</Text>
							</View>
							{isSelected && (
								<Check
									size={DEFAULT_ICON_SIZE}
									color={COLORS.primary[themeColorKey]}
								/>
							)}
						</Button>
					)
				})}
			</View>
		</Modal>
	)
}
