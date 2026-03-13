import { IBase } from './root.types'

export interface IAddress extends IBase {
	label: string | null
	street: string
	house: string
	apartment: string | null
	entrance: string | null
	floor: string | null
	comment: string | null
	isDefault: boolean
	createdAt: string
	updatedAt: string
}

export interface ICreateAddressRequest {
	label?: string
	street: string
	house: string
	apartment?: string
	entrance?: string
	floor?: string
	comment?: string
	isDefault?: boolean
}

export interface IUpdateAddressRequest {
	label?: string
	street?: string
	house?: string
	apartment?: string
	entrance?: string
	floor?: string
	comment?: string
	isDefault?: boolean
}
