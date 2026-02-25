import { FavoriteProductCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Grid, IconButton, Text } from '@/components/ui'
import { useClearFavorites, useFavorites, useToggleFavorite } from '@/store'
import { IProduct } from '@/types'
import { Trash2 } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View } from 'react-native'

export default function FavoriteScreen() {
	const favorites = useFavorites()
	const toggleFavorite = useToggleFavorite()
	const clearFavorites = useClearFavorites()

	const handleToggleFavorite = useCallback(
		(product: IProduct) => {
			toggleFavorite(product)
		},
		[toggleFavorite]
	)

	const renderItem = useCallback(
		({ item }: { item: IProduct }) => (
			<FavoriteProductCard
				product={item}
				isFavorite={true}
				onToggleFavorite={() => handleToggleFavorite(item)}
			/>
		),
		[handleToggleFavorite]
	)

	if (favorites.length === 0) {
		return (
			<Layout className='items-center justify-center'>
				<Text
					variant='secondary'
					size='lg'
				>
					Список избранного пуст
				</Text>
			</Layout>
		)
	}

	return (
		<Layout>
			<Grid
				scrollEnabled
				data={favorites}
				keyExtractor={item => item.id}
				renderItem={renderItem}
				numColumns={2}
				columnWrapperStyle={{
					marginBottom: 12,
					gap: 6
				}}
				ListHeaderComponent={
					<View className='flex-row justify-end my-4'>
						<IconButton
							icon={Trash2}
							text='Очистить избранное'
							onPress={clearFavorites}
						/>
					</View>
				}
			/>
		</Layout>
	)
}
