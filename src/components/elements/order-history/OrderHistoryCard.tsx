import { Button, Text } from '@/components/ui'
import { COLORS, DEFAULT_ICON_SIZE } from '@/constants'
import { useThemeMode } from '@/hooks'
import { IOrder } from '@/types'
import {
	formatAddress,
	formatDate,
	formatPrice,
	getFullImageUrl,
	numberPostfixFormat
} from '@/utils'
import { ChevronRight, Package } from 'lucide-react-native'
import React, { useMemo } from 'react'
import { Image, View } from 'react-native'
import OrderStatusLabel from './OrderStatusLabel'

export interface IOrderHistoryCardProps {
	order: IOrder
	onPress: (orderId: string) => void
}

export default function OrderHistoryCard({
	order,
	onPress
}: IOrderHistoryCardProps) {
	const { themeColorKey } = useThemeMode()

	const firstProductImage = order.orderItems[0]?.product?.image

	const formattedAddress = useMemo(
		() =>
			formatAddress({
				street: order.deliveryStreet,
				house: order.deliveryHouse,
				apartment: order.deliveryApartment,
				entrance: order.deliveryEntrance,
				floor: order.deliveryFloor
			}),
		[
			order.deliveryStreet,
			order.deliveryHouse,
			order.deliveryApartment,
			order.deliveryEntrance,
			order.deliveryFloor
		]
	)

	const productsCountText = useMemo(
		() => numberPostfixFormat(order.orderItems.length, 'товар').result,
		[order.orderItems.length]
	)

	return (
		<Button
			className='rounded-2xl border p-4 gap-3'
			style={{
				backgroundColor: COLORS.surface[themeColorKey],
				borderColor: COLORS.border[themeColorKey]
			}}
			onPress={() => onPress(order.id)}
		>
			<View className='flex-row items-center justify-between flex-wrap'>
				<Text
					size='sm'
					variant='secondary'
				>
					{formatDate(order.createdAt)}
				</Text>

				<OrderStatusLabel status={order.status} />
			</View>

			<View className='flex-row gap-3 items-center'>
				{firstProductImage && (
					<View className='w-14 h-14 rounded-2xl'>
						<Image
							source={getFullImageUrl(firstProductImage)}
							className='w-full h-full rounded-2xl'
							resizeMode='cover'
						/>
					</View>
				)}

				<View className='flex-1 gap-1'>
					<Text
						weight='semibold'
						numberOfLines={2}
					>
						{order.orderItems.length === 1
							? order.orderItems[0].productName
							: `${order.orderItems[0].productName} и ещё ${
									numberPostfixFormat(order.orderItems.length - 1, 'товар')
										.result
							  }`}
					</Text>
				</View>
			</View>

			<View className='flex-row items-center justify-between gap-4 flex-wrap'>
				<View className='flex-1 gap-0.5'>
					<View className='flex-row items-center gap-1'>
						<Package
							size={14}
							color={COLORS.text.secondary[themeColorKey]}
						/>
						<Text
							size='xs'
							variant='secondary'
							numberOfLines={1}
						>
							{formattedAddress}
						</Text>
					</View>
				</View>

				<Text
					size='lg'
					weight='bold'
				>
					{formatPrice(order.totalAmount)}
				</Text>
			</View>

			<View className='flex-row items-center justify-between'>
				<Text
					size='sm'
					variant='secondary'
				>
					{productsCountText}
				</Text>

				<View className='flex-row items-center'>
					<Text
						size='sm'
						weight='medium'
						style={{ color: COLORS.primary[themeColorKey] }}
					>
						Подробнее
					</Text>
					<ChevronRight
						size={DEFAULT_ICON_SIZE}
						color={COLORS.primary[themeColorKey]}
					/>
				</View>
			</View>
		</Button>
	)
}
