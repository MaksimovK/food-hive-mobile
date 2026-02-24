export interface IBannerItem {
	id: string
	image: string
	title: string | null
	description: string | null
	link: string | null
	order: number
	isActive: boolean
}
