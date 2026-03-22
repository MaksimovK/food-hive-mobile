import { IconButton, Title } from '@/components/ui'
import { IUser } from '@/types'
import { getFullImageUrl } from '@/utils'
import { CircleUserRound } from 'lucide-react-native'
import React from 'react'
import { Image, View } from 'react-native'

export default function ProfileHeader({ user }: { user?: IUser }) {
	return (
		<View className='flex-row items-center justify-between py-4 flex-wrap gap-2'>
			<Title
				className='flex-wrap'
				title='Профиль'
			/>

			<View className='mr-1'>
				{user?.avatar ? (
					<Image
						source={getFullImageUrl(user.avatar)}
						className='w-16 h-16 rounded-full'
						resizeMode='cover'
					/>
				) : (
					<IconButton
						icon={CircleUserRound}
						size={48}
					/>
				)}
			</View>
		</View>
	)
}
