import { ProfileHeader } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import {
	Button,
	EditProfileModal,
	IconButton,
	Scroll,
	Text,
	ThemeButton,
	ThemeModal,
	toastInfo
} from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useLogoutMutation, useThemeMode, useTypedNavigation } from '@/hooks'
import { ProfileStackParamList } from '@/navigation/stack/profile/ProfileStack'
import { useUser } from '@/store'
import cn from 'clsx'
import { Edit2, LogOut } from 'lucide-react-native'
import React, { useCallback, useState } from 'react'
import { View, ViewProps } from 'react-native'
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
	const [isThemeModalVisible, setIsThemeModalVisible] = useState(false)
	const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
		useState(false)

	const handleGoToLogin = useCallback(() => {
		navigation.navigate('Auth')
	}, [navigation])

	const handleLogout = useCallback(() => {
		logout()
	}, [logout])

	const handleOpenThemeModal = useCallback(() => {
		setIsThemeModalVisible(true)
	}, [])

	const handleCloseThemeModal = useCallback(() => {
		setIsThemeModalVisible(false)
	}, [])

	const handleOpenEditProfileModal = useCallback(() => {
		setIsEditProfileModalVisible(true)
	}, [])

	const handleCloseEditProfileModal = useCallback(() => {
		setIsEditProfileModalVisible(false)
	}, [])

	if (user) {
		return (
			<Layout>
				<Scroll>
					<ProfileHeader user={user} />

					<View className='flex-row items-center justify-between mb-3 gap-2'>
						<Button
							onPress={handleLogout}
							disabled={isPending}
							isLoading={isPending}
							className='w-1/2 flex-row items-center justify-center gap-2 py-4 rounded-2xl'
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

						<ThemeButton onPress={handleOpenThemeModal} />
					</View>

					<Button
						className='p-4 rounded-2xl gap-2'
						style={{
							backgroundColor: COLORS.surface[themeColorKey]
						}}
						onPress={handleOpenEditProfileModal}
					>
						<View className='flex-row items-center gap-2 justify-between'>
							<Text size='lg'>Изменить профиль</Text>
							<IconButton icon={Edit2} />
						</View>

						<View className='items-end'>
							<Text
								size='lg'
								weight='medium'
							>
								{user.name}
							</Text>
							<Text size='lg'>{user.email}</Text>
							<Text size='lg'>{user.phone}</Text>
						</View>
					</Button>

					<RenderMenu />
				</Scroll>

				<ThemeModal
					visible={isThemeModalVisible}
					onClose={handleCloseThemeModal}
				/>

				<EditProfileModal
					visible={isEditProfileModalVisible}
					onClose={handleCloseEditProfileModal}
					user={{
						email: user.email,
						name: user.name,
						phone: user.phone
					}}
					onSuccess={handleCloseEditProfileModal}
				/>
			</Layout>
		)
	}

	return (
		<Layout>
			<Scroll>
				<ProfileHeader />

				<View className='flex-row items-center justify-between gap-2'>
					<Button
						onPress={handleGoToLogin}
						className='w-1/2 items-center justify-center px-8 py-4 rounded-2xl'
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

					<ThemeButton onPress={handleOpenThemeModal} />
				</View>

				<RenderMenu />
			</Scroll>

			<ThemeModal
				visible={isThemeModalVisible}
				onClose={handleCloseThemeModal}
			/>
		</Layout>
	)
}
