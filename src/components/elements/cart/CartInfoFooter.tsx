import { PrimaryButton, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { formatPrice } from '@/utils'
import React from 'react'
import { View } from 'react-native'

interface CartInfoFooterProps {
	totalProducts: number
	totalPrice: number
}

export default function CartInfoFooter({
	totalProducts,
	totalPrice
}: CartInfoFooterProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View
			className='absolute bottom-0 left-0 right-0 px-4 py-2 rounded-t-2xl border-t border-x'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey]
			}}
		>
			<View className='flex-row items-center justify-between'>
				<Text
					size='lg'
					weight='bold'
					className='mb-2'
				>
					Товаров: {totalProducts}
				</Text>

				<Text
					size='lg'
					weight='bold'
					className='mb-2'
				>
					{formatPrice(totalPrice)}
				</Text>
			</View>

			<PrimaryButton>Оформить заказ</PrimaryButton>
		</View>
	)
}
