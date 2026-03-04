import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { EnumUnit } from '@/types'
import { formatPrice } from '@/utils'
import React from 'react'
import { View } from 'react-native'

export interface IProductServingInfoProps {
	unit: EnumUnit
	price: number
	servingSize: number
}

export default function ProductServingInfo({
	unit,
	price,
	servingSize
}: IProductServingInfoProps) {
	const { themeColorKey } = useThemeMode()

	return (
		<View className='flex-row items-center justify-between flex-wrap'>
			<View
				style={{
					backgroundColor: COLORS.disabled.background[themeColorKey]
				}}
				className='px-3 py-1.5 rounded-2xl self-start'
			>
				<Text
					size='lg'
					weight='bold'
					variant='primary'
				>
					{formatPrice(price)}
				</Text>
			</View>

			<Text
				size='lg'
				weight='medium'
				className='mb-2'
			>
				{servingSize} {unit}.
			</Text>
		</View>
	)
}
