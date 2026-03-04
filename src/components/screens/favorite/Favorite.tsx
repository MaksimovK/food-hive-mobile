import { Empty, ProductCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { Grid, IconButton } from '@/components/ui'
import { useClearFavorites, useFavorites } from '@/store'
import { IProduct } from '@/types'
import { Trash2 } from 'lucide-react-native'
import React, { useCallback } from 'react'
import { View } from 'react-native'

export default function FavoriteScreen() {
	const favorites = useFavorites()
	const clearFavorites = useClearFavorites()

	const renderItem = useCallback(
		({ item }: { item: IProduct }) => <ProductCard product={item} />,
		[]
	)

	if (favorites.length === 0) {
		return <Empty title='Список избранного пуст' />
	}

	return (
		<Layout>
			<Grid
				scrollEnabled
				data={favorites}
				keyExtractor={item => `favorite-item-${item.id}`}
				renderItem={renderItem}
				numColumns={2}
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
