import { Button, Scroll, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { IAddressData } from '@/types'
import React from 'react'
import { View } from 'react-native'

export interface IAddressSuggestion {
	value: string
	data: IAddressData
}

export interface IAddressSuggestionsProps {
	suggestions: IAddressSuggestion[]
	onSelect: (suggestion: IAddressSuggestion) => void
	onClose: () => void
}

export default function AddressSuggestions({
	suggestions,
	onSelect,
	onClose
}: IAddressSuggestionsProps) {
	const { themeColorKey } = useThemeMode()

	if (suggestions.length === 0) return null

	return (
		<Scroll
			className='rounded-2xl border max-h-64'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey]
			}}
		>
			{suggestions.map((suggestion, index) => (
				<React.Fragment key={index}>
					<Button
						className='px-4 py-3'
						onPress={() => {
							onSelect(suggestion)
							onClose()
						}}
					>
						<Text
							size='base'
							style={{ color: COLORS.text.primary[themeColorKey] }}
						>
							{suggestion.value}
						</Text>
					</Button>

					{index < suggestions.length - 1 && (
						<View
							className='h-px mx-4'
							style={{ backgroundColor: COLORS.divider[themeColorKey] }}
						/>
					)}
				</React.Fragment>
			))}
		</Scroll>
	)
}
