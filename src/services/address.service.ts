import { axiosWithAuth } from '@/api/interceptor'
import { IAddress, ICreateAddressRequest, IUpdateAddressRequest } from '@/types'

class AddressService {
	private BASE_URL = '/addresses'

	async findAll() {
		const response = await axiosWithAuth.get<IAddress[]>(this.BASE_URL)
		return response.data
	}

	async create(data: ICreateAddressRequest) {
		const response = await axiosWithAuth.post<IAddress>(this.BASE_URL, data)
		return response.data
	}

	async update(id: string, data: IUpdateAddressRequest) {
		const response = await axiosWithAuth.patch<IAddress>(
			`${this.BASE_URL}/${id}`,
			data
		)
		return response.data
	}

	async delete(id: string) {
		const response = await axiosWithAuth.delete<IAddress>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}

	async setDefault(id: string) {
		const response = await axiosWithAuth.patch<IAddress>(
			`${this.BASE_URL}/${id}/set-default`,
			{}
		)
		return response.data
	}
}

export const addressService = new AddressService()
