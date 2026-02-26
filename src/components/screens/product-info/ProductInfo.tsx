import {
	ProductAllergens,
	ProductDescription,
	ProductImage,
	ProductIngredients,
	ProductNutrition
} from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Loader, Scroll } from '@/components/ui'
import { useFetchProduct, useTypedNavigation, useTypedRoute } from '@/hooks'
import { useCallback } from 'react'

export default function ProductInfoScreen() {
	const navigation = useTypedNavigation()
	const route = useTypedRoute<'ProductInfo'>()
	const { productId } = route.params

	const { data: product, isLoading } = useFetchProduct(productId)

	const handleGoBack = useCallback(() => navigation.goBack(), [navigation])

	if (isLoading) return <Loader />

	if (!product) return null

	return (
		<Layout>
			<Scroll>
				<ProductImage
					product={product}
					imageUrl={product.image}
					onGoBack={handleGoBack}
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
			</Scroll>
		</Layout>
	)
}
