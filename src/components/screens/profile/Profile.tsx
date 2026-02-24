import Layout from '@/components/layout/Layout'
import Text from '@/components/ui/Text'
import { useThemeMode } from '@/hooks/useThemeMode'
import React from 'react'
import { Button, View } from 'react-native'

export default function ProfileScreen() {
	const { theme, isDark, toggleTheme } = useThemeMode()

	return (
		<Layout>
			<View className='flex-1 items-center justify-center gap-4 px-4'>
				<View className='w-full gap-2 mt-8'>
					<Text
						variant='secondary'
						size='sm'
						align='center'
					>
						Текущая тема: {theme === 'dark' ? 'Тёмная' : 'Светлая'}
					</Text>

					<Button
						title={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
						onPress={toggleTheme}
					/>
				</View>
			</View>
		</Layout>
	)
}
