import { Text } from '@/components/ui'
import { COLORS } from '@/constants'
import { useThemeMode } from '@/hooks'
import { IProductIngredient } from '@/types'
import React from 'react'
import { View } from 'react-native'

export interface IProductIngredientsProps {
	ingredients: IProductIngredient[]
}

export default function ProductIngredients({
	ingredients
}: IProductIngredientsProps) {
	const { isDark } = useThemeMode()
	const themeColorKey = isDark ? 'dark' : 'light'

	return (
		<View className='mb-4'>
			<Text
				variant='primary'
				weight='semibold'
				size='lg'
				className='mb-2'
			>
				Ингредиенты
			</Text>

			{ingredients.map(pi => (
				<View
					key={pi.id}
					className='flex-row justify-between py-2 border-b'
					style={{
						borderColor: COLORS.divider[themeColorKey]
					}}
				>
					<Text
						variant='primary'
						size='base'
					>
						{pi.ingredient.name}
					</Text>
					<Text
						variant='secondary'
						size='base'
					>
						{pi.amount} {pi.unit}
					</Text>
				</View>
			))}
		</View>
	)
}
