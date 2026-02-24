import Banners from '@/components/elements/banners/Banners'
import Categories from '@/components/elements/categories/Categories'
import ProductsByCategory from '@/components/elements/products/ProductsByCategory'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import Scroll from '@/components/ui/Scroll'
import Title from '@/components/ui/Title'
import { useFetchHome } from '@/hooks/queries/home.queries'
import React, { useCallback, useRef } from 'react'
import { ScrollView, View } from 'react-native'

export default function HomeScreen() {
	const { data, isLoading } = useFetchHome()
	const scrollRef = useRef<ScrollView>(null)
	const categoryRefs = useRef<Record<string, View | null>>({})

	const handleCategoryPress = useCallback((categoryId: string) => {
		const ref = categoryRefs.current[categoryId]
		if (ref && scrollRef.current) {
			ref.measure((x, y, width, height, pageX, pageY) => {
				scrollRef.current?.scrollTo({ y: pageY, animated: true })
			})
		}
	}, [])

	if (isLoading) return <Loader />

	if (!data) return null

	const { banners, categories, productsByCategory } = data

	return (
		<Layout>
			<Scroll ref={scrollRef}>
				<Banners banners={banners} />

				<Title title='Категории' />

				<Categories
					categories={categories}
					onPress={handleCategoryPress}
				/>

				<ProductsByCategory
					productsByCategory={productsByCategory}
					categoryRefs={categoryRefs}
				/>
			</Scroll>
		</Layout>
	)
}
