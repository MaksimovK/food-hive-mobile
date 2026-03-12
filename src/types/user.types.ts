import { IBase } from './root.types'

export type RoleType = 'user' | 'admin'

export interface IUser extends IBase {
	email: string
	name: string | null
	phone: string | null
	avatar: string | null
	role: RoleType
	createdAt: string
}

export interface IUpdateProfileRequest {
	name?: string | null
	phone?: string | null
	avatar?: string | null
	newPassword?: string | null
	currentPassword?: string | null
}
