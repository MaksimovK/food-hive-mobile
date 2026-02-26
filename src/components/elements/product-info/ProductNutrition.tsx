import ProductNutritionItem from '@/components/elements/product-info/ProductNutritionItem'
import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { EnumUnit, EnumUnitLabels } from '@/types'
import React from 'react'
import { View } from 'react-native'

export interface IProductNutritionProps {
	caloriesPer100g: number
	proteinPer100g: number
	fatPer100g: number
	carbsPer100g: number
	servingSize: number
	unit: EnumUnit
}

export default function ProductNutrition({
	caloriesPer100g,
	proteinPer100g,
	fatPer100g,
	carbsPer100g,
	servingSize,
	unit
}: IProductNutritionProps) {
	const { themeColorKey } = useThemeMode()

	const nutritionData = [
		{ label: EnumUnitLabels[unit], value: servingSize },
		{ label: 'Ккал', value: caloriesPer100g },
		{ label: 'Белки', value: proteinPer100g },
		{ label: 'Жиры', value: fatPer100g },
		{ label: 'Углеводы', value: carbsPer100g }
	]

	return (
		<View
			style={{
				backgroundColor: COLORS.surface[themeColorKey]
			}}
			className='p-4 rounded-2xl mb-4'
		>
			<Text
				variant='primary'
				weight='semibold'
				size='lg'
				className='mb-2'
			>
				Пищевая ценность на 100 г
			</Text>

			<View className='flex-row justify-between'>
				{nutritionData.map((item, index) => (
					<ProductNutritionItem
						key={index}
						label={item.label}
						value={item.value}
					/>
				))}
			</View>
		</View>
	)
}
