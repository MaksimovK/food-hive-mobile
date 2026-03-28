import { axiosClassic, axiosWithAuth } from '@/api/interceptor'
import {
	IAuthResponse,
	ILoginRequest,
	IRefreshTokenResponse,
	IRegisterRequest
} from '@/types'

class AuthService {
	private BASE_URL = '/auth'

	async register(data: IRegisterRequest): Promise<IAuthResponse> {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/register`,
			data
		)
		return response.data
	}

	async login(data: ILoginRequest): Promise<IAuthResponse> {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/login`,
			data
		)
		return response.data
	}

	async refreshToken(refreshToken: string): Promise<IRefreshTokenResponse> {
		const response = await axiosWithAuth.post<IRefreshTokenResponse>(
			`${this.BASE_URL}/refresh`,
			{ refreshToken }
		)
		return response.data
	}

	async logout(refreshToken: string): Promise<{ message: string }> {
		const response = await axiosWithAuth.post<{ message: string }>(
			`${this.BASE_URL}/logout`,
			{ refreshToken }
		)
		return response.data
	}
}

export const authService = new AuthService()
