import { axiosWithAuth } from '@/api/interceptor'
import { UpdateProfileRequest, UserResponse } from '@/types'

class UserService {
	private BASE_URL = '/users'

	async updateProfile(dto: UpdateProfileRequest): Promise<UserResponse> {
		const response = await axiosWithAuth.patch<UserResponse>(
			`${this.BASE_URL}/profile`,
			dto
		)
		return response.data
	}
}

export const userService = new UserService()
