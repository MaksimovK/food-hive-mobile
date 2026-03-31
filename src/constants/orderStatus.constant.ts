import { EnumOrderStatus } from '@/types'
import { COLORS } from './colors.constant'

export const statusLabels: Record<EnumOrderStatus, string> = {
	PENDING: 'Ожидает подтверждения',
	CONFIRMED: 'Подтверждён',
	PREPARING: 'Готовится',
	ON_THE_WAY: 'В пути',
	DELIVERED: 'Доставлен',
	CANCELLED: 'Отменён'
}

export const getStatusColors = (
	status: EnumOrderStatus,
	themeColorKey: 'light' | 'dark'
) => {
	const colorMap: Record<
		EnumOrderStatus,
		{
			background: string
			text: string
			border: string
		}
	> = {
		PENDING: {
			background: COLORS.orderStatus.pending.background[themeColorKey],
			text: COLORS.orderStatus.pending.text[themeColorKey],
			border: COLORS.orderStatus.pending.border[themeColorKey]
		},
		CONFIRMED: {
			background: COLORS.orderStatus.confirmed.background[themeColorKey],
			text: COLORS.orderStatus.confirmed.text[themeColorKey],
			border: COLORS.orderStatus.confirmed.border[themeColorKey]
		},
		PREPARING: {
			background: COLORS.orderStatus.preparing.background[themeColorKey],
			text: COLORS.orderStatus.preparing.text[themeColorKey],
			border: COLORS.orderStatus.preparing.border[themeColorKey]
		},
		ON_THE_WAY: {
			background: COLORS.orderStatus.onTheWay.background[themeColorKey],
			text: COLORS.orderStatus.onTheWay.text[themeColorKey],
			border: COLORS.orderStatus.onTheWay.border[themeColorKey]
		},
		DELIVERED: {
			background: COLORS.orderStatus.delivered.background[themeColorKey],
			text: COLORS.orderStatus.delivered.text[themeColorKey],
			border: COLORS.orderStatus.delivered.border[themeColorKey]
		},
		CANCELLED: {
			background: COLORS.orderStatus.cancelled.background[themeColorKey],
			text: COLORS.orderStatus.cancelled.text[themeColorKey],
			border: COLORS.orderStatus.cancelled.border[themeColorKey]
		}
	}

	return colorMap[status]
}
