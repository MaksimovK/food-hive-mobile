import { axiosClassic } from '@/api/interceptor'
import { IHomeResponse } from '@/types/home/home.types'

class HomeService {
	private BASE_URL = '/home'

	async getHome() {
		const response = await axiosClassic.get<IHomeResponse>(`${this.BASE_URL}`)
		return response.data
	}
}

export const homeService = new HomeService()
