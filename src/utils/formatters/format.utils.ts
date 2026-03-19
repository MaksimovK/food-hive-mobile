import { MONTH_NAMES } from '@/constants'
import { IAddress } from '@/types'

export function formatAddress(address: IAddress): string {
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
