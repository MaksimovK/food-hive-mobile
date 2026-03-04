import {
	ProductAllergens,
	ProductDescription,
	ProductImage,
	ProductInfoFooter,
	ProductIngredients,
	ProductNutrition
} from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Loader, Scroll } from '@/components/ui'
import { useFetchProduct, useTypedRoute } from '@/hooks'
import { useCartItemTotal } from '@/store'
import React from 'react'
import { View } from 'react-native'

export default function ProductInfoScreen() {
	const route = useTypedRoute<'ProductInfo'>()
	const { productId } = route.params

	const { data: product, isLoading } = useFetchProduct(productId)
	const totalPrice = useCartItemTotal(productId)

	if (isLoading) return <Loader />

	if (!product) return null

	return (
		<Layout className='relative'>
			<Scroll>
				<ProductImage
					product={product}
					imageUrl={product.image}
				/>

				<ProductDescription
					name={product.name}
					description={product.description}
				/>

				<ProductNutrition
					caloriesPer100g={product.caloriesPer100g}
					proteinPer100g={product.proteinPer100g}
					fatPer100g={product.fatPer100g}
					carbsPer100g={product.carbsPer100g}
					servingSize={product.servingSize}
					unit={product.unit}
				/>

				<ProductIngredients ingredients={product.productIngredients} />

				<ProductAllergens ingredients={product.productIngredients} />

				<View className='h-16' />
			</Scroll>

			<ProductInfoFooter
				product={product}
				totalPrice={totalPrice || product.price}
			/>
		</Layout>
	)
}
