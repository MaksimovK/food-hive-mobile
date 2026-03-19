import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'

export interface ISwitchProps {
	value: boolean
	onValueChange: (value: boolean) => void
	disabled?: boolean
	size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
	sm: { width: 40, height: 24, thumb: 20 },
	md: { width: 50, height: 30, thumb: 26 },
	lg: { width: 60, height: 36, thumb: 32 }
}

export default function Switch({
	value,
	onValueChange,
	disabled = false,
	size = 'md'
}: ISwitchProps) {
	const { themeColorKey } = useThemeMode()
	const dimensions = SIZE_MAP[size]

	const handlePress = () => {
		if (!isDisabled) {
			onValueChange(!value)
		}
	}

	const isDisabled = !!disabled
	const isActive = value

	const backgroundColor = isActive
		? COLORS.primary[themeColorKey]
		: COLORS.border[themeColorKey]

	const thumbBackgroundColor = COLORS.background[themeColorKey]
	const opacity = isDisabled ? 0.5 : 1

	const containerStyle: ViewStyle = {
		width: dimensions.width,
		height: dimensions.height,
		opacity
	}

	const thumbStyle: ViewStyle = {
		width: dimensions.thumb,
		height: dimensions.thumb,
		backgroundColor: thumbBackgroundColor,
		transform: [
			{
				translateX: isActive ? dimensions.width - dimensions.thumb - 6 : 0
			}
		]
	}

	return (
		<TouchableWithoutFeedback
			onPress={handlePress}
			disabled={isDisabled}
		>
			<View
				className={'justify-center px-1 rounded-full'}
				style={{
					...containerStyle,
					backgroundColor
				}}
			>
				<View
					className='rounded-full shadow-sm'
					style={thumbStyle}
				/>
			</View>
		</TouchableWithoutFeedback>
	)
}
