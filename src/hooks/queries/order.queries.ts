import { errorCatch } from '@/api/error'
import { toastError, toastSuccess } from '@/components/ui'
import { orderService } from '@/services'
import { useClearCart, useSetCart } from '@/store'
import { ICartResponse, ICreateOrderRequest, IGetOrdersRequest } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useCheckoutData() {
	return useQuery({
		queryKey: ['checkout-data'],
		queryFn: () => orderService.getCheckoutData()
	})
}

export function useCreateOrder() {
	const queryClient = useQueryClient()
	const clearCart = useClearCart()

	return useMutation({
		mutationFn: (data: ICreateOrderRequest) => orderService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['checkout-data'] })
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			clearCart()
			toastSuccess('Заказ успешно создан')
		},
		onError: error => {
			toastError(`Ошибка: ${errorCatch(error)}`)
		}
	})
}

export function useOrders(query?: IGetOrdersRequest) {
	return useQuery({
		queryKey: ['orders', query],
		queryFn: () => orderService.getOrders(query)
	})
}

export function useOrderById(id: string) {
	return useQuery({
		queryKey: ['order', id],
		queryFn: () => orderService.getOrderById(id),
		enabled: !!id
	})
}

export function useRepeatOrder(id: string) {
	const clear = useClearCart()
	const setCart = useSetCart()

	return useMutation({
		mutationFn: () => orderService.repeatOrder(id),
		onSuccess: (response: ICartResponse) => {
			clear()
			setCart(response)
			toastSuccess('Товары добавлены в корзину')
		},
		onError: error => {
			toastError(`Ошибка: ${errorCatch(error)}`)
		}
	})
}
