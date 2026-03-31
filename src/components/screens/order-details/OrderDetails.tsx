import { Empty, OrderStatusLabel, ProductElement } from '@/components/elements'
import Layout from '@/components/layout/Layout'
import {
	BackButton,
	Button,
	Loader,
	Scroll,
	Separator,
	Text
} from '@/components/ui'
import { COLORS } from '@/constants'
import {
	useOrderById,
	useRepeatOrder,
	useThemeMode,
	useTypedRoute
} from '@/hooks'
import { EnumPaymentMethod } from '@/types'
import {
	formatAddress,
	formatDateTime,
	formatPrice,
	numberPostfixFormat,
	orderItemToProductDisplay
} from '@/utils'
import {
	Clock,
	CreditCard,
	MapPin,
	Package,
	Repeat,
	User
} from 'lucide-react-native'
import React, { useMemo } from 'react'
import { View } from 'react-native'

const paymentMethodLabels: Record<EnumPaymentMethod, string> = {
	CARD: 'Картой',
	CASH: 'Наличными'
}

export default function OrderDetailsScreen() {
	const route = useTypedRoute<'OrderDetails'>()
	const { orderId } = route.params

	const { themeColorKey } = useThemeMode()
	const { data: order, isLoading } = useOrderById(orderId)
	const { mutate: repeat, isPending } = useRepeatOrder(orderId)

	const formattedAddress = useMemo(() => {
		if (!order) return ''
		return formatAddress({
			street: order.deliveryStreet,
			house: order.deliveryHouse,
			apartment: order.deliveryApartment,
			entrance: order.deliveryEntrance,
			floor: order.deliveryFloor
		})
	}, [order])

	const handlePressRepeat = () => {
		repeat()
	}

	if (isLoading) return <Loader />

	if (!order)
		return (
			<Empty
				icon={Package}
				title='Заказ не найден'
			/>
		)

	return (
		<Layout>
			<Scroll>
				<View className='flex-1 py-4 gap-4 pb-8'>
					<View className='flex-row items-center justify-between'>
						<BackButton />

						<Button
							className='flex-row items-center gap-2'
							onPress={handlePressRepeat}
							isLoading={isPending}
						>
							<Repeat
								size={20}
								color={COLORS.primary[themeColorKey]}
							/>
							<Text style={{ color: COLORS.primary[themeColorKey] }}>
								Повторить
							</Text>
						</Button>
					</View>

					<View className='items-start'>
						<OrderStatusLabel status={order.status} />
					</View>

					<View className='flex-row flex-wrap gap-4 justify-between'>
						<View className='flex-row items-center gap-2'>
							<Clock
								size={20}
								color={COLORS.text.secondary[themeColorKey]}
							/>
							<Text variant='secondary'>{formatDateTime(order.createdAt)}</Text>
						</View>

						<View className='flex-row items-center gap-2'>
							<CreditCard
								size={20}
								color={COLORS.text.secondary[themeColorKey]}
							/>
							<Text variant='secondary'>
								{paymentMethodLabels[order.paymentMethod]}
							</Text>
						</View>
					</View>

					{formattedAddress && (
						<View className='flex-row items-center gap-2 flex-wrap justify-between'>
							<View className='flex-row items-center gap-2'>
								<MapPin
									size={20}
									color={COLORS.text.secondary[themeColorKey]}
								/>
								<Text>Адрес доставки:</Text>
							</View>
							<Text
								weight='semibold'
								className='ml-8'
							>
								{formattedAddress}
							</Text>
						</View>
					)}

					<Separator className='my-3' />

					<View className='gap-3'>
						<View className='flex-row items-center gap-2'>
							<User
								size={20}
								color={COLORS.text.secondary[themeColorKey]}
							/>
							<Text
								weight='semibold'
								size='base'
							>
								Контактная информация:
							</Text>
						</View>
						<View className='flex-col items-start gap-2 ml-8'>
							<Text>{order.userName}</Text>
							<Text>{order.deliveryPhone}</Text>
						</View>
					</View>

					<Separator className='my-3' />

					<View className='gap-3'>
						<View className='flex-row items-center gap-2'>
							<Package
								size={20}
								color={COLORS.text.secondary[themeColorKey]}
							/>
							<Text weight='semibold'>
								Товары в заказе (
								{numberPostfixFormat(order.orderItems.length, 'товар').result})
							</Text>
						</View>

						{order.orderItems.map(item => {
							return (
								<ProductElement
									key={item.id}
									product={orderItemToProductDisplay(item)}
								/>
							)
						})}
					</View>

					{order.orderComment && (
						<>
							<Separator className='my-3' />
							<View className='flex-col gap-2'>
								<Text weight='semibold'>Комментарий к заказу: </Text>
								<Text variant='secondary'>{order.orderComment}</Text>
							</View>
							<Separator className='my-3' />
						</>
					)}

					<View className='flex-row justify-between items-center'>
						<Text
							size='lg'
							weight='semibold'
						>
							Итого
						</Text>
						<Text
							size='xl'
							weight='bold'
						>
							{formatPrice(order.totalAmount)}
						</Text>
					</View>
				</View>
			</Scroll>
		</Layout>
	)
}
