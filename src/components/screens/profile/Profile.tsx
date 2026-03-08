import Layout from '@/components/layout/Layout'
import {
	Button,
	IconButton,
	Scroll,
	Text,
	ThemeButton,
	Title,
	toastInfo
} from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useLogoutMutation, useThemeMode, useTypedNavigation } from '@/hooks'
import { ProfileStackParamList } from '@/navigation/stack/profile/ProfileStack'
import { useUser } from '@/store'
import { getFullImageUrl } from '@/utils'
import cn from 'clsx'
import { CircleUserRound, LogOut } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { Image, View, ViewProps } from 'react-native'
import { profileMenu } from './profile-menu.data'

function RenderMenu({ className, ...props }: ViewProps) {
	const navigation = useTypedNavigation<ProfileStackParamList>()
	const { themeColorKey } = useThemeMode()
	const user = useUser()

	const handleNavigation = useCallback(
		(page: keyof ProfileStackParamList) => {
			if (!user && (page === 'Address' || page === 'OrderHistory')) {
				toastInfo('Войдите в аккаунт')
				return
			}

			navigation.navigate(page)
		},
		[navigation, user]
	)

	return (
		<View
			{...props}
			className={cn('flex-col gap-6 my-6', className)}
		>
			{profileMenu.map((route, index) => (
				<Button
					key={`route-item-${route.page}-${index}`}
					className='flex-row items-center'
					onPress={() => handleNavigation(route.page)}
				>
					<route.icon
						size={DEFAULT_ICON_SIZE}
						color={COLORS.primary[themeColorKey]}
					/>
					<Text
						size='lg'
						className='ml-3'
					>
						{route.label}
					</Text>
				</Button>
			))}
		</View>
	)
}

export default function ProfileScreen() {
	const navigation = useTypedNavigation()
	const user = useUser()

	const { themeColorKey } = useThemeMode()
	const { mutate: logout, isPending } = useLogoutMutation()

	const handleGoToLogin = useCallback(() => {
		navigation.navigate('Auth')
	}, [navigation])

	const handleLogout = useCallback(() => {
		logout()
	}, [logout])

	if (user) {
		return (
			<Layout>
				<Scroll>
					<View className='flex-row items-center justify-between py-4 flex-wrap gap-2'>
						<Title
							className='flex-wrap'
							title={`Привет, ${user.name || 'Гость'}`}
						/>

						<View className='flex-row items-center gap-6 mr-1'>
							<ThemeButton />

							<View className='flex-row items-center gap-2'>
								{user.avatar ? (
									<Image
										source={getFullImageUrl(user.avatar)}
										className='w-10 h-10 rounded-2xl'
										resizeMode='cover'
									/>
								) : (
									<IconButton
										icon={CircleUserRound}
										size={40}
									/>
								)}
							</View>
						</View>
					</View>

					<RenderMenu />
				</Scroll>

				<Button
					onPress={handleLogout}
					disabled={isPending}
					isLoading={isPending}
					className='flex-row items-center justify-center gap-2 py-4 rounded-2xl absolute bottom-4 left-4 right-4'
					style={{
						backgroundColor: COLORS.error[themeColorKey]
					}}
				>
					<LogOut
						size={DEFAULT_ICON_SIZE}
						color={COLORS.text.onPrimary[themeColorKey]}
					/>
					<Text
						size='base'
						weight='semibold'
						style={{
							color: COLORS.text.onPrimary[themeColorKey]
						}}
					>
						Выйти
					</Text>
				</Button>
			</Layout>
		)
	}

	return (
		<Layout>
			<Scroll>
				<View className='flex-row items-center justify-between py-4 flex-wrap gap-2'>
					<Title
						className='flex-wrap'
						title='Привет, Гость'
					/>

					<View className='flex-row items-center gap-6 mr-1'>
						<ThemeButton />
						<IconButton
							icon={CircleUserRound}
							size={40}
						/>
					</View>
				</View>

				<RenderMenu />
			</Scroll>

			<Button
				onPress={handleGoToLogin}
				className='items-center justify-center px-8 py-4 rounded-2xl absolute bottom-4 left-4 right-4'
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
		</Layout>
	)
}
