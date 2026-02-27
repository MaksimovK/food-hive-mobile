import { IBase } from '../root.types'

export interface IBannerItem extends IBase {
	image: string
	title: string | null
	description: string | null
	link: string | null
	order: number
	isActive: boolean
}
