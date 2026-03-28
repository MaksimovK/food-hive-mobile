import { IAddress } from './address.types'
import { IBase } from './root.types'

const EnumPaymentMethod = {
	CASH: 'CASH',
	CARD: 'CARD'
} as const

export type EnumPaymentMethod =
	(typeof EnumPaymentMethod)[keyof typeof EnumPaymentMethod]

const EnumOrderStatus = {
	PENDING: 'PENDING',
	CONFIRMED: 'CONFIRMED',
	PREPARING: 'PREPARING',
	ON_THE_WAY: 'ON_THE_WAY',
	DELIVERED: 'DELIVERED',
	CANCELLED: 'CANCELLED'
} as const

export type EnumOrderStatus =
	(typeof EnumOrderStatus)[keyof typeof EnumOrderStatus]

const EnumOrderSortBy = {
	DATE: 'date',
	PRICE: 'price'
} as const

export type EnumOrderSortBy =
	(typeof EnumOrderSortBy)[keyof typeof EnumOrderSortBy]

const EnumOrderSortOrder = {
	ASC: 'asc',
	DESC: 'desc'
} as const

export type EnumOrderSortOrder =
	(typeof EnumOrderSortOrder)[keyof typeof EnumOrderSortOrder]

export interface IOrderItem extends IBase {
	quantity: number
	price: number
	productName: string
	product: {
		id: string
		image: string
	}
}

export interface IOrder extends IBase {
	userName: string
	status: EnumOrderStatus
	paymentMethod: EnumPaymentMethod
	totalAmount: number
	deliveryStreet: string
	deliveryHouse: string
	deliveryApartment: string | null
	deliveryEntrance: string | null
	deliveryFloor: string | null
	deliveryComment: string | null
	deliveryPhone: string
	orderComment: string | null
	createdAt: string
	orderItems: IOrderItem[]
}

export interface ICheckoutCartItem extends IBase {
	image: string
	name: string
	price: number
	quantity: number
	itemTotal: number
}

export interface IPaymentMethod {
	value: EnumPaymentMethod
	label: string
}

export interface ICheckoutDataResponse {
	addresses: IAddress[]
	cartItems: ICheckoutCartItem[]
	totalProducts: number
	totalPrice: number
	paymentMethods: IPaymentMethod[]
}

export interface ICreateOrderRequest {
	addressId: string
	paymentMethod: EnumPaymentMethod
	orderComment?: string
}

export interface IGetOrdersRequest {
	sortBy?: EnumOrderSortBy
	sortOrder?: EnumOrderSortOrder
}
