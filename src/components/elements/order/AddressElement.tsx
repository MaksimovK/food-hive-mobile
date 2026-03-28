import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { IAddress } from '@/types'
import { formatAddress } from '@/utils'
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

export interface IAddressElementProps {
	address: IAddress
	isSelected: boolean
	onSelect: (address: IAddress) => void
}

export default function AddressElement({
	address,
	isSelected,
	onSelect
}: IAddressElementProps) {
	const { themeColorKey } = useThemeMode()

	const borderColor = isSelected
		? COLORS.primary[themeColorKey]
		: COLORS.background[themeColorKey]

	return (
		<TouchableWithoutFeedback onPress={() => onSelect(address)}>
			<View
				className='flex-row items-center gap-4 rounded-2xl border p-4'
				style={{ borderColor }}
			>
				<View
					className={`items-center justify-center rounded-full border-2 w-6 h-6`}
					style={{ borderColor }}
				>
					{isSelected && (
						<View
							className='rounded-full w-3 h-3'
							style={{ backgroundColor: COLORS.primary[themeColorKey] }}
						/>
					)}
				</View>

				<View className='flex-1 flex-col gap-1'>
					{address.label && <Text>{address.label}</Text>}
					<Text weight='semibold'>{formatAddress(address)}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
