import { IBase } from './root.types'

export type RoleType = 'user' | 'admin'

export interface AuthUserResponse extends IBase {
	email: string
	name: string | null
	phone: string | null
	avatar: string | null
	role: RoleType
	createdAt: string
}

export interface LoginDto {
	email: string
	password: string
}

export interface RegisterDto {
	email: string
	password: string
	name?: string
	phone?: string
}

export interface AuthResponse {
	user: AuthUserResponse
	accessToken: string
	refreshToken: string
}

export interface RefreshTokenResponse {
	accessToken: string
	refreshToken: string
}
