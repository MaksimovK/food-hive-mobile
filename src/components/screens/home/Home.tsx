import { Banners, Categories, ProductsByCategory } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Loader, Scroll, Title, UpButton } from '@/components/ui'
import { SCROLL_THRESHOLD } from '@/constants'
import { useFetchHome } from '@/hooks'
import React, { useCallback, useRef, useState } from 'react'
import { Image, ScrollView, View } from 'react-native'

export default function HomeScreen() {
	const { data, isLoading } = useFetchHome()
	const scrollRef = useRef<ScrollView>(null)
	const categoryRefs = useRef<Record<string, View | null>>({})
	const [showUpButton, setShowUpButton] = useState(false)

	const handleScroll = useCallback(
		(event: Parameters<NonNullable<ScrollView['props']['onScroll']>>[0]) => {
			const contentOffsetY = event.nativeEvent.contentOffset.y
			setShowUpButton(contentOffsetY >= SCROLL_THRESHOLD)
		},
		[]
	)

	const handleCategoryPress = useCallback((categoryId: string) => {
		const ref = categoryRefs.current[categoryId]
		if (ref && scrollRef.current) {
			ref.measure((x, y, width, height, pageX, pageY) => {
				scrollRef.current?.scrollTo({ y: pageY, animated: true })
			})
		}
	}, [])

	const handleScrollToTop = useCallback(() => {
		scrollRef.current?.scrollTo({ y: 0, animated: true })
	}, [])

	if (isLoading) return <Loader />

	if (!data) return null

	const { banners, categories, productsByCategory } = data

	return (
		<Layout>
			<Scroll
				ref={scrollRef}
				onScroll={handleScroll}
			>
				<View className='flex-row items-center justify-end pt-4 gap-4'>
					<Title title='Food Hive' />

					<Image
						width={48}
						height={48}
						className='w-12 h-12'
						source={require('@/assets/images/logo.png')}
					/>
				</View>

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

			{showUpButton && (
				<UpButton
					className='absolute bottom-6 right-6 w-[40px] h-[40px]'
					onPress={handleScrollToTop}
				/>
			)}
		</Layout>
	)
}
