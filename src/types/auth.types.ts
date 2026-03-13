import { IUser } from './user.types'

export interface ILoginRequest {
	email: string
	password: string
}

export interface IRegisterRequest {
	email: string
	password: string
	name?: string
	phone?: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
	refreshToken: string
}

export interface IRefreshTokenResponse {
	accessToken: string
	refreshToken: string
}
