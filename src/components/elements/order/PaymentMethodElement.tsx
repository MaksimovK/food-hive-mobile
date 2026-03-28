import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { EnumPaymentMethod, IPaymentMethod } from '@/types'
import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

export interface IPaymentMethodElementProps {
	paymentMethod: IPaymentMethod
	isSelected: boolean
	onSelect: (value: EnumPaymentMethod) => void
}

export default function PaymentMethodElement({
	paymentMethod,
	isSelected,
	onSelect
}: IPaymentMethodElementProps) {
	const { themeColorKey } = useThemeMode()

	const borderColor = isSelected
		? COLORS.primary[themeColorKey]
		: COLORS.background[themeColorKey]

	return (
		<TouchableWithoutFeedback onPress={() => onSelect(paymentMethod.value)}>
			<View
				className='flex-1 flex-row items-center gap-3 rounded-2xl border p-4'
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

				<Text weight='medium'>{paymentMethod.label}</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}
