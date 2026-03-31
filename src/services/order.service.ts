import { axiosWithAuth } from '@/api/interceptor'
import {
	ICartResponse,
	ICheckoutDataResponse,
	ICreateOrderRequest,
	IGetOrdersRequest,
	IOrder
} from '@/types'

class OrderService {
	private BASE_URL = '/orders'

	async getCheckoutData() {
		const response = await axiosWithAuth.get<ICheckoutDataResponse>(
			`${this.BASE_URL}/checkout`
		)
		return response.data
	}

	async create(data: ICreateOrderRequest) {
		const response = await axiosWithAuth.post<IOrder>(this.BASE_URL, data)
		return response.data
	}

	async getOrders(query?: IGetOrdersRequest) {
		const response = await axiosWithAuth.get<IOrder[]>(this.BASE_URL, {
			params: query
		})
		return response.data
	}

	async getOrderById(id: string) {
		const response = await axiosWithAuth.get<IOrder>(`${this.BASE_URL}/${id}`)
		return response.data
	}

	async repeatOrder(id: string) {
		const response = await axiosWithAuth.post<ICartResponse>(
			`${this.BASE_URL}/${id}/repeat`
		)
		return response.data
	}
}

export const orderService = new OrderService()
