import { IBannerItem } from './home.banner.types'
import { ICategoryItem } from './home.category.types'
import { IProductsByCategory } from './home.products'

export interface IHomeResponse {
	banners: IBannerItem[]
	categories: ICategoryItem[]
	productsByCategory: IProductsByCategory[]
}
