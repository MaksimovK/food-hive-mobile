import { ProductCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Grid, Loader, SearchInput, Text } from '@/components/ui'
import { useDebounce, useSearchProducts } from '@/hooks'
import { IProduct } from '@/types'
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

export default function SearchScreen() {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedQuery = useDebounce(searchQuery, 300)

	const { data: products, isLoading } = useSearchProducts(debouncedQuery)

	const hasResults = useMemo(() => products && products.length > 0, [products])
	const hasSearched = useMemo(() => debouncedQuery.length > 0, [debouncedQuery])

	const renderProduct = useCallback(({ item }: { item: IProduct }) => {
		return <ProductCard product={item} />
	}, [])

	const content = useMemo(() => {
		if (isLoading) {
			return (
				<View className='flex-1 items-center justify-center'>
					<Loader />
				</View>
			)
		}

		if (!hasSearched) {
			return (
				<View className='flex-1 items-center justify-center'>
					<Text
						size='lg'
						variant='secondary'
					>
						Введите название продукта в поиск
					</Text>
				</View>
			)
		}

		if (!hasResults) {
			return (
				<View className='flex-1 items-center justify-center'>
					<Text
						size='lg'
						variant='secondary'
					>
						Ничего не найдено
					</Text>
				</View>
			)
		}

		return (
			<Grid
				scrollEnabled
				data={products}
				keyExtractor={item => item.id}
				renderItem={renderProduct}
				numColumns={2}
			/>
		)
	}, [isLoading, hasSearched, hasResults, products, renderProduct])

	return (
		<Layout>
			<View className='my-4'>
				<SearchInput
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>
			{content}
		</Layout>
	)
}
