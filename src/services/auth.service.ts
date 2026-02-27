import { axiosClassic, axiosWithAuth } from '@/api/interceptor'
import {
	AuthResponse,
	LoginDto,
	RefreshTokenResponse,
	RegisterDto
} from '@/types'

class AuthService {
	private BASE_URL = '/auth'

	async register(dto: RegisterDto): Promise<AuthResponse> {
		const response = await axiosClassic.post<AuthResponse>(
			`${this.BASE_URL}/register`,
			dto
		)
		return response.data
	}

	async login(dto: LoginDto): Promise<AuthResponse> {
		const response = await axiosClassic.post<AuthResponse>(
			`${this.BASE_URL}/login`,
			dto
		)
		return response.data
	}

	async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
		const response = await axiosWithAuth.post<RefreshTokenResponse>(
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
