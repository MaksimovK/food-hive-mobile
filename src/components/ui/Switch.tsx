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
		if (!disabled) {
			onValueChange(!value)
		}
	}

	const containerStyle: ViewStyle = {
		width: dimensions.width,
		height: dimensions.height,
		borderRadius: dimensions.height / 2,
		justifyContent: 'center',
		paddingHorizontal: 4,
		backgroundColor: value
			? COLORS.primary[themeColorKey]
			: COLORS.border[themeColorKey],
		opacity: disabled ? 0.5 : 1
	}

	const thumbStyle: ViewStyle = {
		width: dimensions.thumb,
		height: dimensions.thumb,
		borderRadius: dimensions.thumb / 2,
		backgroundColor: COLORS.background[themeColorKey],
		transform: [
			{
				translateX: value ? dimensions.width - dimensions.thumb - 6 : 0
			}
		],
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2
	}

	return (
		<TouchableWithoutFeedback
			onPress={handlePress}
			disabled={disabled}
		>
			<View style={containerStyle}>
				<View style={thumbStyle} />
			</View>
		</TouchableWithoutFeedback>
	)
}
