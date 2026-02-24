export interface IProduct {
	id: string
	name: string
	description: string | null
	image: string
	price: number
	caloriesPer100g: number
	proteinPer100g: number
	fatPer100g: number
	carbsPer100g: number
	servingSize: number
	isActive: boolean
	categoryId: string
}
