import { ProductCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Grid, Loader, SearchInput, Text } from '@/components/ui'
import { END_REACHED_THRESHOLD, SEARCH_DEBOUNCE } from '@/constants'
import { useDebounce, useSearchProducts } from '@/hooks'
import { IProduct } from '@/types'
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

export default function SearchScreen() {
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE)

	const {
		data: products,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage
	} = useSearchProducts(debouncedQuery)

	const hasResults = useMemo(() => (products?.length ?? 0) > 0, [products])
	const hasSearched = useMemo(() => debouncedQuery.length > 0, [debouncedQuery])

	const renderProduct = useCallback(
		({ item }: { item: IProduct }) => <ProductCard product={item} />,
		[]
	)

	const handleEndReached = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
				onEndReached={handleEndReached}
				onEndReachedThreshold={END_REACHED_THRESHOLD}
				ListFooterComponent={
					isFetchingNextPage ? (
						<View className='py-4 items-center'>
							<Loader />
						</View>
					) : null
				}
			/>
		)
	}, [
		isLoading,
		hasSearched,
		hasResults,
		products,
		renderProduct,
		handleEndReached,
		isFetchingNextPage
	])

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
