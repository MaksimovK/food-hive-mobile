import { IBase } from '../root.types'

export interface ICategoryItem extends IBase {
	name: string
	image: string | null
	description: string | null
	order: number
	isActive: boolean
}
