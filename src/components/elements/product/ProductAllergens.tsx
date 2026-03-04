import { Text } from '@/components/ui'
import { IProductIngredient } from '@/types'
import React from 'react'
import { View } from 'react-native'

export interface IProductAllergensProps {
	ingredients: IProductIngredient[]
}

export default function ProductAllergens({
	ingredients
}: IProductAllergensProps) {
	const allergenSet = new Set<string>()

	ingredients.forEach(({ ingredient }) => {
		if (ingredient.containsGluten) allergenSet.add('Глютен')
		if (ingredient.containsDairy) allergenSet.add('Молочные продукты')
		if (ingredient.containsNuts) allergenSet.add('Орехи')
		if (ingredient.containsSoy) allergenSet.add('Соя')
		if (ingredient.containsEggs) allergenSet.add('Яйца')
	})

	const allergensText = Array.from(allergenSet).join(', ') || 'Нет'

	return (
		<View>
			<Text
				variant='secondary'
				size='base'
				className='mb-4'
			>
				Аллергены: {allergensText}
			</Text>
		</View>
	)
}
