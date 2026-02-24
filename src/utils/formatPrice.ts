export const formatPrice = (price: number): string =>
	`${price.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB'
	})}`
