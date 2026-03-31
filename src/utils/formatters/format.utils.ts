import { MONTH_NAMES } from '@/constants'
import { IAddress, ICheckoutCartItem, IOrderItem } from '@/types'

export function formatAddress(
	address: Omit<IAddress, 'id' | 'isDefault' | 'label' | 'comment'>
): string {
	return [
		address.street,
		address.house && `д. ${address.house}`,
		address.apartment && `кв. ${address.apartment}`,
		address.entrance && `под. ${address.entrance}`,
		address.floor && `эт. ${address.floor}`
	]
		.filter(Boolean)
		.join(', ')
}

export const formatPrice = (price: number): string =>
	`${price.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB'
	})}`

export const formatDate = (
	date: Date | string,
	displayFormat: 'short' | 'long' = 'long'
): string => {
	if (!date) return ''

	if (typeof date === 'string') date = new Date(date)

	const day = date.getUTCDate()
	const month = date.getUTCMonth()
	const year = date.getUTCFullYear()

	if (displayFormat === 'long') {
		return `${day} ${MONTH_NAMES[month]} ${year}`
	}

	const pad = (num: number) => String(num).padStart(2, '0')
	return `${pad(day)}-${pad(month + 1)}-${year}`
}

export const formatDateTime = (date: Date | string): string => {
	if (!date) return ''

	if (typeof date === 'string') date = new Date(date)

	const day = date.getUTCDate()
	const month = date.getUTCMonth()
	const year = date.getUTCFullYear()
	const hours = date.getUTCHours()
	const minutes = date.getUTCMinutes()

	const pad = (num: number) => String(num).padStart(2, '0')
	return `${pad(day)} ${MONTH_NAMES[month]} ${year}, ${pad(hours)}:${pad(minutes)}`
}

export function numberPostfixFormat(number: number, word: string) {
	let postfix

	const lastDigit = number % 10
	const lastTwoDigits = number % 100

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		postfix = ''
	} else if (
		[2, 3, 4].includes(lastDigit) &&
		![12, 13, 14].includes(lastTwoDigits)
	) {
		postfix = 'а'
	} else {
		postfix = 'ов'
	}

	word = `${word}${postfix}`
	return { result: `${number} ${word}`, postfix: word }
}

export const orderItemToProductDisplay = (
	item: IOrderItem
): ICheckoutCartItem => ({
	id: item.id,
	name: item.productName,
	image: item.product.image,
	price: item.price,
	quantity: item.quantity,
	itemTotal: item.price * item.quantity
})