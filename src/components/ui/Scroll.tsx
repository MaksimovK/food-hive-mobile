import { DEFAULT_SCROLL_EVENT_THROTTLE } from '@/constants/component.constant'
import React, { forwardRef } from 'react'
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native'

export interface ScrollProps extends ScrollViewProps {
	children: React.ReactNode
	contentContainerStyle?: ViewStyle
	gap?: number
	snapToInterval?: number
	paddingVertical?: number
	direction?: 'horizontal' | 'vertical'
}

const Scroll = forwardRef<ScrollView, ScrollProps>(function Scroll(
	{
		children,
		direction = 'vertical',
		scrollEventThrottle = DEFAULT_SCROLL_EVENT_THROTTLE,
		showsVerticalScrollIndicator = false,
		showsHorizontalScrollIndicator = false,
		snapToAlignment = 'center',
		contentContainerStyle,
		gap = 0,
		snapToInterval,
		paddingVertical = 0,
		...props
	},
	ref
) {
	const isHorizontal = direction === 'horizontal'

	return (
		<ScrollView
			ref={ref}
			horizontal={isHorizontal}
			showsVerticalScrollIndicator={showsVerticalScrollIndicator}
			showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
			scrollEventThrottle={scrollEventThrottle}
			snapToAlignment={snapToAlignment}
			snapToInterval={snapToInterval}
			decelerationRate={isHorizontal ? 'fast' : 'normal'}
			contentContainerStyle={{
				gap,
				paddingVertical,
				...contentContainerStyle
			}}
			{...props}
		>
			{children}
		</ScrollView>
	)
})

export default Scroll
