import { Empty, OrderHistoryCard } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import { BackButton, Loader, Scroll, Select, Title } from '@/components/ui'
import { useOrders, useTypedNavigation } from '@/hooks'
import { EnumOrderSortBy, EnumOrderSortOrder } from '@/types'
import { Package } from 'lucide-react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

type SortOption = {
	label: string
	sortBy: EnumOrderSortBy
	sortOrder: EnumOrderSortOrder
}

const sortOptions: SortOption[] = [
	{ label: 'Сначала новые', sortBy: 'date', sortOrder: 'desc' },
	{ label: 'Сначала старые', sortBy: 'date', sortOrder: 'asc' },
	{ label: 'Сначала дорогие', sortBy: 'price', sortOrder: 'desc' },
	{ label: 'Сначала дешёвые', sortBy: 'price', sortOrder: 'asc' }
]

export default function OrderHistoryScreen() {
	const navigation = useTypedNavigation()
	const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0])

	const query = useMemo(
		() => ({
			sortBy: selectedSort.sortBy,
			sortOrder: selectedSort.sortOrder
		}),
		[selectedSort]
	)
	const { data: orders, isLoading, isError } = useOrders(query)

	const selectOptions = useMemo(
		() =>
			sortOptions.map(opt => ({
				label: opt.label,
				value: `${opt.sortBy}-${opt.sortOrder}`
			})),
		[]
	)

	const handleSortChange = useCallback((value: string) => {
		const option = sortOptions.find(
			opt => `${opt.sortBy}-${opt.sortOrder}` === value
		)
		if (option) setSelectedSort(option)
	}, [])

	const handleOrderPress = useCallback(
		(orderId: string) => {
			navigation.navigate('OrderDetails', { orderId })
		},
		[navigation]
	)

	if (isLoading) return <Loader />

	if (isError)
		return (
			<Empty
				icon={Package}
				title='Ошибка загрузки заказов'
				description='Попробуйте повторить позже'
			/>
		)

	if (!orders || orders.length === 0)
		return (
			<Empty
				icon={Package}
				title='Нет заказов'
				description='Вы ещё не оформили ни одного заказа'
			/>
		)

	return (
		<Layout>
			<Scroll>
				<View className='flex-1 py-4 gap-4 pb-8'>
					<View className='flex-row items-center relative'>
						<BackButton />
						<Title
							title='История заказов'
							className='absolute top-0 left-1/2 -translate-x-1/2'
						/>
					</View>

					<Select
						value={`${selectedSort.sortBy}-${selectedSort.sortOrder}`}
						options={selectOptions}
						onChange={handleSortChange}
					/>

					{orders.map(order => (
						<OrderHistoryCard
							key={order.id}
							order={order}
							onPress={handleOrderPress}
						/>
					))}
				</View>
			</Scroll>
		</Layout>
	)
}
