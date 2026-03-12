import { IUser } from './user.types'

export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest {
	email: string
	password: string
	name?: string
	phone?: string
}

export interface AuthResponse {
	user: IUser
	accessToken: string
	refreshToken: string
}

export interface RefreshTokenResponse {
	accessToken: string
	refreshToken: string
}
