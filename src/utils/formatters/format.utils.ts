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
