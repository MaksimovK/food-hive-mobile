import { axiosDaData } from '@/api/interceptor'
import { IAddressResponse, IDaDataRequest } from '@/types'

class DaDataService {
	async getAddresses(data: IDaDataRequest) {
		const response = await axiosDaData.post<IAddressResponse>('address', data)
		return response.data
	}
}

export const daDataService = new DaDataService()
