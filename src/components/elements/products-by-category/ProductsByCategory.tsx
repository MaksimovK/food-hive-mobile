import { ProductCard } from '@/components/elements'
import { Title } from '@/components/ui'
import { IProductsByCategory } from '@/types'
import React, { useCallback } from 'react'
import { View } from 'react-native'

export interface IProductsByCategoryProps {
	productsByCategory: IProductsByCategory[]
	categoryRefs: React.MutableRefObject<Record<string, View | null>>
}

export default function ProductsByCategory({
	productsByCategory,
	categoryRefs
}: IProductsByCategoryProps) {
	const setCategoryRef = useCallback(
		(categoryId: string) => (ref: View | null) => {
			if (!categoryRefs.current) categoryRefs.current = {}
			categoryRefs.current[categoryId] = ref
		},
		[categoryRefs]
	)

	return productsByCategory.map(category => (
		<View
			ref={setCategoryRef(category.categoryId)}
			className='mb-4'
			key={category.categoryId}
		>
			<Title
				title={category.categoryName}
				className='mb-4'
			/>

			<View className='flex-col gap-2 px-1.5'>
				{category.products.map(product => (
					<ProductCard
						key={product.id}
						variant='horizontal'
						product={product}
					/>
				))}
			</View>
		</View>
	))
}
