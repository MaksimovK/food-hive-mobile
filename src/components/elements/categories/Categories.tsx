import { Scroll } from '@/components/ui'
import { ICategoryItem } from '@/types'
import React from 'react'
import CategoryItem from './CategoryItem'

export interface ICategoriesProps {
	categories: ICategoryItem[]
	onPress: (categoryId: string) => void
}

export default function Categories({ categories, onPress }: ICategoriesProps) {
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
