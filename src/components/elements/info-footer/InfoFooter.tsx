import { PrimaryButton, Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { useIsAuthenticated } from '@/store'
import { formatPrice } from '@/utils'
import React from 'react'
import { View } from 'react-native'

export interface IInfoFooterProps {
	totalProducts: number
	totalPrice: number
	onPress?: () => void
	disabled?: boolean
	isLoading?: boolean
}

export default function InfoFooter({
	totalProducts,
	totalPrice,
	onPress,
	isLoading,
	disabled = false
}: IInfoFooterProps) {
	const isAuth = useIsAuthenticated()
	const { themeColorKey } = useThemeMode()

	return (
		<View
			className='absolute bottom-0 left-0 right-0 px-4 py-2 rounded-t-2xl border-t border-x'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey]
			}}
		>
			<View className='flex-row items-center justify-between mb-4'>
				<Text
					size='lg'
					weight='bold'
				>
					Товаров: {totalProducts}
				</Text>

				<Text
					size='lg'
					weight='bold'
				>
					{formatPrice(totalPrice)}
				</Text>
			</View>

			<PrimaryButton
				onPress={onPress}
				isLoading={isLoading}
				disabled={!isAuth || disabled}
				state={disabled ? 'disable' : 'default'}
			>
				{isAuth ? 'Оформить заказ' : 'Войдите, чтобы оформить заказ'}
			</PrimaryButton>
		</View>
	)
}
