import { Scroll } from '@/components/ui'
import { IBannerItem } from '@/types'
import React from 'react'
import { useWindowDimensions, ViewStyle } from 'react-native'
import BannerItem from './BannerItem'

export interface IBannersProps {
	banners: IBannerItem[]
	contentContainerStyle?: ViewStyle
}

export default function Banners({
	banners,
	contentContainerStyle
}: IBannersProps) {
	const { width } = useWindowDimensions()
	const bannerWidth = width - 64

	return (
		<Scroll
			gap={16}
			paddingVertical={16}
			snapToInterval={width - 44}
			direction='horizontal'
			contentContainerStyle={contentContainerStyle}
		>
			{banners.map(banner => (
				<BannerItem
					key={banner.id}
					banner={banner}
					style={{ width: bannerWidth }}
				/>
			))}
		</Scroll>
	)
}
