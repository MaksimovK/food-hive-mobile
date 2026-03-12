import { axiosWithAuth } from '@/api/interceptor'
import { IUpdateProfileRequest, IUser } from '@/types'

class UserService {
	private BASE_URL = '/users'

	async updateProfile(dto: IUpdateProfileRequest): Promise<IUser> {
		const response = await axiosWithAuth.patch<IUser>(
			`${this.BASE_URL}/profile`,
			dto
		)
		return response.data
	}
}

export const userService = new UserService()
