import Text from '@/components/ui/Text'
import { IBannerItem } from '@/types/home/home.banner.types'
import { getFullImageUrl } from '@/utils/image.util'
import React from 'react'
import { ImageBackground, type ImageBackgroundProps } from 'react-native'

export interface BannerItemProps extends Omit<ImageBackgroundProps, 'source'> {
	banner: IBannerItem
}

export default function BannerItem({ banner, ...props }: BannerItemProps) {
	return (
		<ImageBackground
			{...props}
			source={getFullImageUrl(banner.image)}
			className='w-full h-[176px] rounded-2xl overflow-hidden'
			resizeMode='cover'
		>
			{banner.title && (
				<Text
					size='2xl'
					weight='bold'
					variant='primary'
					className='absolute bottom-3 left-3'
				>
					{banner.title}
				</Text>
			)}
		</ImageBackground>
	)
}
