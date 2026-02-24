import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { getFullImageUrl } from '@/utils'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Image, Pressable, View } from 'react-native'

export interface IProductImageProps {
	imageUrl: string
	onGoBack: () => void
}

export default function ProductImage({
	imageUrl,
	onGoBack
}: IProductImageProps) {
	const { isDark } = useThemeMode()
	const themeColorKey = isDark ? 'dark' : 'light'

	return (
		<View className='relative'>
			<View className='w-full h-80'>
				<Image
					source={getFullImageUrl(imageUrl)}
					className='w-full h-full rounded-2xl'
					resizeMode='cover'
				/>
			</View>

			<Pressable
				onPress={onGoBack}
				style={{
					backgroundColor: COLORS.surfaceElevated[themeColorKey]
				}}
				className='absolute top-4 left-4 p-2 rounded-full'
			>
				<ArrowLeft
					size={24}
					color={COLORS.text.primary[themeColorKey]}
				/>
			</Pressable>
		</View>
	)
}
