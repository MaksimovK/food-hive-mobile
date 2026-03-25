import { axiosDaData } from '@/api/interceptor'
import { IAddressResponse, IDaDataRequest } from '@/types'

class DaDataService {
	async getAddresses(params: IDaDataRequest) {
		const response = await axiosDaData.post<IAddressResponse>('address', params)
		return response.data
	}
}

export const daDataService = new DaDataService()
