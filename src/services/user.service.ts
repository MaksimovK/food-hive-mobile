import { axiosWithAuth } from '@/api/interceptor'
import { IUpdateProfileRequest, IUser } from '@/types'

class UserService {
	private BASE_URL = '/users'

	async updateProfile(data: IUpdateProfileRequest): Promise<IUser> {
		const response = await axiosWithAuth.patch<IUser>(
			`${this.BASE_URL}/profile`,
			data
		)
		return response.data
	}

	async uploadAvatar(file: FormData): Promise<IUser> {
		const response = await axiosWithAuth.patch<IUser>(
			`${this.BASE_URL}/profile/avatar`,
			file,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		return response.data
	}

	async removeAvatar(): Promise<IUser> {
		const response = await axiosWithAuth.delete<IUser>(
			`${this.BASE_URL}/profile/avatar`
		)
		return response.data
	}
}

export const userService = new UserService()
