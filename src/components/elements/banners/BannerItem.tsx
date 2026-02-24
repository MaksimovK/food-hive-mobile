import { Text } from '@/components/ui'
import { IBannerItem } from '@/types'
import { getFullImageUrl } from '@/utils'
import React from 'react'
import { ImageBackground, type ImageBackgroundProps } from 'react-native'

export interface IBannerItemProps extends Omit<ImageBackgroundProps, 'source'> {
	banner: IBannerItem
}

export default function BannerItem({ banner, ...props }: IBannerItemProps) {
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
