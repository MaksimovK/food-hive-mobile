import { Text } from '@/components/ui'
import React from 'react'
import { View } from 'react-native'

export interface IProductNutritionItemProps {
	label: string
	value: number
}

export default function ProductNutritionItem({
	label,
	value
}: IProductNutritionItemProps) {
	return (
		<View className='items-center'>
			<Text
				variant='secondary'
				size='sm'
			>
				{label}
			</Text>
			<Text
				variant='primary'
				weight='bold'
				size='lg'
			>
				{value}
			</Text>
		</View>
	)
}
