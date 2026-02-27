import Layout from '@/components/layout/Layout'
import { Button, Scroll, Text, ThemeButton, Title } from '@/components/ui'
import { COLORS } from '@/constants'
import { useLogoutMutation, useThemeMode, useTypedNavigation } from '@/hooks'
import { useUser } from '@/store'
import { CircleUserRound, LogOut } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View } from 'react-native'

export default function ProfileScreen() {
	const navigation = useTypedNavigation()
	const { themeColorKey } = useThemeMode()
	const user = useUser()
	const { mutate: logout, isPending } = useLogoutMutation()

	const handleGoToLogin = useCallback(() => {
		navigation.navigate('Auth')
	}, [navigation])

	const handleLogout = useCallback(() => {
		logout()
	}, [logout])

	return (
		<Layout>
			<Scroll>
				<View className='flex-row items-center justify-between py-4'>
					<Title title={'Профиль'} />

					<View className='flex-row gap-2'>
						<ThemeButton />

						<CircleUserRound
							size={40}
							color={COLORS.text.disabled[themeColorKey]}
						/>
					</View>
				</View>

				{user ? (
					<Button
						onPress={handleLogout}
						disabled={isPending}
						className='flex-row items-center justify-center gap-2 py-4 rounded-xl'
						style={{
							backgroundColor: COLORS.error[themeColorKey]
						}}
					>
						<LogOut
							size={20}
							color={COLORS.text.onPrimary[themeColorKey]}
						/>
						<Text
							size='base'
							weight='semibold'
							style={{
								color: COLORS.text.onPrimary[themeColorKey]
							}}
						>
							{isPending ? 'Выход...' : 'Выйти'}
						</Text>
					</Button>
				) : (
					<Button
						onPress={handleGoToLogin}
						className='px-8 py-4 rounded-xl mt-4'
						style={{
							backgroundColor: COLORS.primary[themeColorKey]
						}}
					>
						<Text
							size='lg'
							weight='bold'
							style={{
								color: COLORS.text.onPrimary[themeColorKey]
							}}
						>
							Войти
						</Text>
					</Button>
				)}
			</Scroll>
		</Layout>
	)
}
