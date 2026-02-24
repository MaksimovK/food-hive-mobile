import Layout from '@/components/layout/Layout'
import { Scroll, Text, Title } from '@/components/ui'
import { useThemeMode } from '@/hooks'
import { CircleUserRound } from 'lucide-react-native'
import React from 'react'
import { Button, View } from 'react-native'

export default function ProfileScreen() {
	const { theme, isDark, toggleTheme } = useThemeMode()

	return (
		<Layout>
			<Scroll>
				<View className='flex-row justify-between items-center py-4'>
					<Title title='Привет, Гость' />
					<CircleUserRound size={40} />
				</View>

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
			</Scroll>
		</Layout>
	)
}
