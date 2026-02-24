import Text from '@/components/ui/Text'
import { ICategoryItem } from '@/types/home/home.category.types'
import { getFullImageUrl } from '@/utils/image.util'
import React from 'react'
import { Image, Pressable, PressableProps, View } from 'react-native'

export interface ICategoryItemProps extends Omit<PressableProps, 'onPress'> {
	category: ICategoryItem
	onPress: (categoryId: string) => void
}

export default function CategoryItem({
	category,
	onPress,
	...props
}: ICategoryItemProps) {
	return (
		<Pressable
			{...props}
			onPress={() => onPress(category.id)}
			className='items-center'
		>
			<View className='w-24 h-24 rounded-2xl overflow-hidden'>
				{category.image && (
					<Image
						source={getFullImageUrl(category.image)}
						className='w-full h-full'
						resizeMode='cover'
					/>
				)}
			</View>

			<Text
				size='sm'
				weight='medium'
				align='center'
				className='mt-2'
				numberOfLines={2}
			>
				{category.name}
			</Text>
		</Pressable>
	)
}
