import Layout from '@/components/layout/Layout'
import { Text } from '@/components/ui'
import { useToggleTheme } from '@/store/theme.store'
import React from 'react'
import { Button, View } from 'react-native'

export default function ProfileScreen() {
	const toggleTheme = useToggleTheme()

	return (
		<Layout>
			<View className='flex-1 items-center justify-center gap-4'>
				<Text
					size='xl'
					weight='bold'
				>
					Profile
				</Text>
				<Text
					variant='secondary'
					size='sm'
				>
					Нажми кнопку для смены темы
				</Text>
				<Button
					title='Toggle Theme'
					onPress={toggleTheme}
				/>
			</View>
		</Layout>
	)
}
