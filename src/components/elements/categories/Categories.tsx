import Scroll from '@/components/ui/Scroll'
import { ICategoryItem } from '@/types/home/home.category.types'
import React from 'react'
import CategoryItem from './CategoryItem'

export interface CategoriesProps {
	categories: ICategoryItem[]
	onPress: (categoryId: string) => void
}

export default function Categories({ categories, onPress }: CategoriesProps) {
	return (
		<Scroll
			gap={8}
			paddingVertical={16}
			direction='horizontal'
		>
			{categories.map(category => (
				<CategoryItem
					key={category.id}
					category={category}
					onPress={onPress}
				/>
			))}
		</Scroll>
	)
}
