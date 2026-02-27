import { Button, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import React from 'react'
import { View } from 'react-native'

export interface IAuthToggleProps {
	questionText: string
	buttonText: string
	onPress: () => void
}

export default function AuthToggle({
	questionText,
	buttonText,
	onPress
}: IAuthToggleProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View className='flex-row justify-center gap-2'>
			<Text variant='secondary'>{questionText}</Text>

			<Button onPress={onPress}>
				<Text
					weight='semibold'
					style={{
						color: COLORS.primary[themeColorKey]
					}}
				>
					{buttonText}
				</Text>
			</Button>
		</View>
	)
}
