import { Banners, Categories, ProductsByCategory } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Loader, Scroll, Title } from '@/components/ui'
import { useFetchHome } from '@/hooks'
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
